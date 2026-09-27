/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  UserCheck,
  HelpCircle,
  GraduationCap,
  ListFilter,
  Volume2
} from 'lucide-react';
import { QUESTIONS, Question } from './questions.ts';

type Screen = 'NAME_SELECTION' | 'QUIZ' | 'RESULT';
type FilterType = 'all' | 'correct' | 'wrong';

export default function App() {
  const [screen, setScreen] = useState<Screen>('NAME_SELECTION');
  const [studentName, setStudentName] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Store user answers mapped by question index (0 to 39)
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [reviewFilter, setReviewFilter] = useState<FilterType>('all');
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const webhookSentRef = useRef<boolean>(false);

  const currentQuestion: Question = QUESTIONS[currentIndex];
  const selectedAnswer = userAnswers[currentIndex];
  const totalQuestions = QUESTIONS.length;

  // Calculate score
  const correctCount = QUESTIONS.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.dapAn ? acc + 1 : acc;
  }, 0);

  // Send webhook when reaching the Result screen
  useEffect(() => {
    if (screen === 'RESULT' && !webhookSentRef.current && studentName) {
      webhookSentRef.current = true;

      // Confetti burst for students
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (correctCount >= 30) {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0 }
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1 }
            });
          }, 350);
        }
      } catch (err) {
        console.log('Confetti effect error:', err);
      }

      // Send webhook to Google Sheet + Telegram
      const sendResult = async () => {
        const payload = {
          ten: studentName,
          lop: "9",
          diem: correctCount,
          tongCau: totalQuestions,
          url: window.location.href,
        };

        try {
          console.log("Đang gửi kết quả về Google Sheet & Telegram...", payload);
          // Try standard fetch first
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
          console.log("Kết quả gửi thành công! Status:", response.status);
        } catch (fetchErr) {
          console.warn("CORS hoặc fetch chuẩn gặp lỗi, đang thử gửi lại với chế độ no-cors:", fetchErr);
          try {
            await fetch(
              "https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec",
              {
                method: "POST",
                mode: "no-cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
            console.log("Đã gửi kết quả bằng fallback no-cors thành công!");
          } catch (err2) {
            console.error("Lỗi khi gửi kết quả về Google Sheet / Telegram:", err2);
          }
        }
      };

      sendResult();
    }
  }, [screen, studentName, correctCount, totalQuestions]);

  const handleStartQuiz = () => {
    if (!studentName) return;
    setCurrentIndex(0);
    setUserAnswers({});
    setHasSubmitted(false);
    webhookSentRef.current = false;
    setScreen('QUIZ');
  };

  const handleSelectAnswer = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionKey,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question: Submit
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // If some questions are unanswered, optional confirm
    const unansweredCount = totalQuestions - Object.keys(userAnswers).length;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `Em còn ${unansweredCount} câu chưa chọn đáp án. Em có chắc chắn muốn nộp bài luôn không?`
      );
      if (!confirmSubmit) return;
    }
    setHasSubmitted(true);
    setScreen('RESULT');
  };

  const handleReset = () => {
    setStudentName('');
    setCurrentIndex(0);
    setUserAnswers({});
    setHasSubmitted(false);
    webhookSentRef.current = false;
    setReviewFilter('all');
    setScreen('NAME_SELECTION');
  };

  // Helper to pronounce the highlighted English word
  const playWordAudio = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Render question text with bold and highlight for the **word**
  const renderQuestionStory = (text: string, enableAudioButton = true) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    let extractedWord = '';

    const content = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const word = part.slice(2, -2);
        extractedWord = word;
        return (
          <span
            key={i}
            className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md mx-1 shadow-xs tracking-wide"
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });

    return (
      <div className="text-gray-800 text-base sm:text-lg leading-relaxed font-normal">
        {content}
        {enableAudioButton && extractedWord && (
          <button
            type="button"
            onClick={() => playWordAudio(extractedWord)}
            className="inline-flex items-center ml-2 p-1 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100/70 rounded-full transition-colors cursor-pointer align-middle"
            title={`Phát âm từ "${extractedWord}"`}
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-indigo-50/40 to-slate-100 flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight tracking-tight">
                Tiếng Anh 9 · Ôn Thi Vào 10
              </h1>
              <p className="text-xs text-indigo-600 font-medium hidden sm:block">
                Luyện tập 40 từ vựng cốt lõi qua câu chuyện học đường
              </p>
            </div>
          </div>

          {studentName && screen !== 'NAME_SELECTION' && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 rounded-full shadow-xs">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span className="text-xs sm:text-sm font-bold text-indigo-900">{studentName}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col justify-center">
        {/* ======================================================== */}
        {/* MÀN HÌNH 1: CHỌN TÊN                                     */}
        {/* ======================================================== */}
        {screen === 'NAME_SELECTION' && (
          <div className="max-w-xl mx-auto w-full my-auto py-4">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-indigo-100/60 border border-indigo-100/80 relative overflow-hidden">
              {/* Background decorative blob */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-linear-to-br from-indigo-200/50 to-pink-200/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-linear-to-tr from-sky-200/50 to-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-xs px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Bộ đề trắc nghiệm đặc biệt</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tight">
                  Chào Mừng Đến Với Bài Luyện Tập! ✨
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Luyện tập 40 câu trắc nghiệm từ vựng tiếng Anh lớp 9 qua những mẩu chuyện gần gũi, giúp các em tự tin bứt phá điểm số thi vào 10.
                </p>

                {/* Name Selector Container */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mb-8 text-left shadow-xs">
                  <label
                    htmlFor="student-select"
                    className="block text-sm font-bold text-gray-800 mb-2.5 flex items-center justify-between"
                  >
                    <span>Chọn tên của em</span>
                    <span className="text-xs text-rose-500 font-medium">* Bắt buộc</span>
                  </label>

                  <div className="relative">
                    <select
                      id="student-select"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl px-4 py-3.5 text-base sm:text-lg font-semibold text-gray-800 appearance-none cursor-pointer transition-all outline-hidden shadow-xs"
                    >
                      <option value="" disabled>
                        -- Chọn tên của em --
                      </option>
                      <option value="Như Quỳnh">Như Quỳnh</option>
                      <option value="Ngọc Trân">Ngọc Trân</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>

                  {/* Fast pick buttons */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Hoặc bấm chọn nhanh:</span>
                    <button
                      type="button"
                      onClick={() => setStudentName('Như Quỳnh')}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                        studentName === 'Như Quỳnh'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      Như Quỳnh
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentName('Ngọc Trân')}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                        studentName === 'Ngọc Trân'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      Ngọc Trân
                    </button>
                  </div>
                </div>

                {/* Features preview */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 text-center">
                  <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                    <div className="text-lg sm:text-xl font-black text-indigo-700">40</div>
                    <div className="text-xs font-semibold text-gray-600">Câu trắc nghiệm</div>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                    <div className="text-lg sm:text-xl font-black text-sky-700">Tự do</div>
                    <div className="text-xs font-semibold text-gray-600">Không ép thời gian</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <div className="text-lg sm:text-xl font-black text-emerald-700">Tự động</div>
                    <div className="text-xs font-semibold text-gray-600">Chấm & gửi điểm</div>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  type="button"
                  disabled={!studentName}
                  onClick={handleStartQuiz}
                  className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md ${
                    studentName
                      ? 'bg-linear-to-r from-indigo-600 via-indigo-700 to-sky-600 text-white shadow-indigo-300 hover:shadow-indigo-400 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Bắt đầu làm bài</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                {!studentName && (
                  <p className="mt-3 text-xs text-amber-600 font-medium">
                    ⚠️ Vui lòng chọn tên để mở nút bắt đầu làm bài
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN HÌNH 2: LÀM BÀI (40 CÂU)                            */}
        {/* ======================================================== */}
        {screen === 'QUIZ' && (
          <div className="max-w-2xl mx-auto w-full py-2">
            {/* Progress Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100/90 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-indigo-700 text-lg sm:text-xl">
                    Câu {currentIndex + 1}
                  </span>
                  <span className="text-gray-400 font-medium text-sm sm:text-base">
                    / {totalQuestions}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                    className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200/80 transition-colors flex items-center gap-1.5"
                  >
                    <span>Xem danh sách câu</span>
                    <span className="bg-indigo-600 text-white text-[11px] px-1.5 py-0.2 rounded-full font-mono">
                      {Object.keys(userAnswers).length}/{totalQuestions}
                    </span>
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-indigo-500 to-sky-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Quick Drawer/Grid popup */}
              {showQuestionGrid && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Chọn nhanh câu hỏi
                    </span>
                    <span className="text-xs text-gray-500">
                      Đã làm: {Object.keys(userAnswers).length}/{totalQuestions} câu
                    </span>
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                    {QUESTIONS.map((q, idx) => {
                      const isAnswered = userAnswers[idx] !== undefined;
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCurrentIndex(idx);
                            setShowQuestionGrid(false);
                          }}
                          className={`h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-1'
                              : isAnswered
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                              : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-md mb-5 relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Trắc nghiệm từ vựng
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {studentName && `Dành cho ${studentName}`}
                </span>
              </div>

              {/* Question story text */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                {renderQuestionStory(currentQuestion.hoi)}
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const isSelected = selectedAnswer === optKey;
                  const optionText = currentQuestion[optKey];

                  return (
                    <button
                      key={optKey}
                      type="button"
                      onClick={() => handleSelectAnswer(optKey)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-sm text-indigo-950 font-bold'
                          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 flex-1 pr-2">
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                          }`}
                        >
                          {optKey}
                        </span>
                        <span className="text-base sm:text-lg leading-snug">{optionText}</span>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Prompt if no answer selected yet */}
              {!selectedAnswer && (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                  <HelpCircle className="w-4 h-4" />
                  <span>Em hãy chọn một đáp án nhé!</span>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`py-3.5 px-5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 border transition-all ${
                  currentIndex === 0
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white/50'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer shadow-xs'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Câu trước</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`flex-1 max-w-xs py-3.5 px-6 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-md ${
                  !selectedAnswer
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : currentIndex === totalQuestions - 1
                    ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                    : 'bg-linear-to-r from-indigo-600 to-sky-600 text-white hover:from-indigo-700 hover:to-sky-700 shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                }`}
              >
                <span>{currentIndex === totalQuestions - 1 ? 'Nộp bài' : 'Câu tiếp theo'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN HÌNH 3: KẾT QUẢ                                      */}
        {/* ======================================================== */}
        {screen === 'RESULT' && (
          <div className="max-w-3xl mx-auto w-full py-4">
            {/* Score Banner Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-indigo-100 shadow-xl shadow-indigo-100/50 mb-8 text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-100/60 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-lg shadow-amber-200 mb-4">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 text-amber-900" />
                </div>

                <div className="inline-block bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 rounded-full text-indigo-700 font-bold text-sm mb-3">
                  Học sinh: {studentName} · Lớp 9
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2">
                  Em đúng {correctCount}/{totalQuestions} câu
                </h2>

                {/* Score percentage bar & grade commentary */}
                <p className="text-base sm:text-lg font-semibold text-indigo-600 mb-4">
                  {correctCount === 40 && '🎉 Xuất sắc tuyệt đối! 10/10 điểm từ vựng sẵn sàng đỗ trường chuyên!'}
                  {correctCount >= 35 && correctCount < 40 && '🌟 Rất xuất sắc! Vốn từ vựng của em cực kỳ phong phú và chắc chắn!'}
                  {correctCount >= 30 && correctCount < 35 && '👏 Giỏi lắm! Nắm chắc đại đa số từ vựng trọng tâm lớp 9!'}
                  {correctCount >= 20 && correctCount < 30 && '💪 Khá tốt! Hãy ôn lại các từ chưa đúng bên dưới để ghi nhớ sâu hơn nhé!'}
                  {correctCount < 20 && '📖 Cần chăm chỉ hơn! Đừng lo lắng, hãy xem kỹ đáp án và luyện lại lần nữa nha!'}
                </p>

                {/* Accuracy percentage */}
                <div className="max-w-xs mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-3 mb-6">
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                    <span>Tỷ lệ chính xác</span>
                    <span className="text-indigo-600">{Math.round((correctCount / totalQuestions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-linear-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3.5 px-6 rounded-2xl bg-linear-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại từ đầu</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Review Section */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-indigo-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Chi Tiết Đáp Án Từng Câu (40 câu)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Kiểm tra lại từng từ vựng và câu chuyện để khắc sâu kiến thức
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto justify-between sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setReviewFilter('all')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      reviewFilter === 'all'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Tất cả ({totalQuestions})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('correct')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                      reviewFilter === 'correct'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-gray-600 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đúng ({correctCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('wrong')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                      reviewFilter === 'wrong'
                        ? 'bg-white text-rose-700 shadow-xs'
                        : 'text-gray-600 hover:text-rose-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sai ({totalQuestions - correctCount})</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {QUESTIONS.filter((_, idx) => {
                  const isCorrect = userAnswers[idx] === QUESTIONS[idx].dapAn;
                  if (reviewFilter === 'correct') return isCorrect;
                  if (reviewFilter === 'wrong') return !isCorrect;
                  return true;
                }).map((q) => {
                  const originalIndex = q.cau - 1;
                  const studentAnswerKey = userAnswers[originalIndex];
                  const isCorrect = studentAnswerKey === q.dapAn;
                  const correctAnswerText = q[q.dapAn];
                  const studentAnswerText = studentAnswerKey ? q[studentAnswerKey] : 'Chưa chọn';

                  return (
                    <div
                      key={q.cau}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-rose-200 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            #{q.cau}
                          </span>
                          <span
                            className={`text-xs font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Chính xác</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Chưa đúng</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Question content */}
                      <div className="mb-3 text-sm sm:text-base text-gray-800">
                        {renderQuestionStory(q.hoi, false)}
                      </div>

                      {/* Answers explanation comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div
                          className={`p-2.5 rounded-xl border flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                              : 'bg-rose-50 border-rose-200 text-rose-900 font-medium'
                          }`}
                        >
                          <div>
                            <span className="text-gray-500 font-normal mr-1.5">Em chọn:</span>
                            <span className="font-bold">
                              {studentAnswerKey ? `${studentAnswerKey}. ${studentAnswerText}` : 'Không trả lời'}
                            </span>
                          </div>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                          <div>
                            <span className="text-gray-500 font-normal mr-1.5">Đáp án đúng:</span>
                            <span className="font-bold">
                              {q.dapAn}. {correctAnswerText}
                            </span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom reset button */}
              <div className="mt-8 text-center pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-8 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-sm sm:text-base transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Quay lại màn hình chính</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 border-t border-slate-200/60 bg-white/50">
        <p>Luyện thi vào lớp 10 môn Tiếng Anh · Dành riêng cho học sinh Như Quỳnh & Ngọc Trân</p>
      </footer>
    </div>
  );
}
