export interface Question {
  cau: number;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export const QUESTIONS: Question[] = [
  {
    cau: 1,
    hoi: "Sáng nay, Như Quỳnh đọc báo và biết rằng **environment** ở thành phố đang bị ảnh hưởng nghiêm trọng bởi khói bụi xe cộ. Từ 'environment' trong câu trên có nghĩa là gì?",
    A: "Môi trường",
    B: "Khí hậu",
    C: "Thiên nhiên",
    D: "Dân số",
    dapAn: "A"
  },
  {
    cau: 2,
    hoi: "Cô nói với Ngọc Trân rằng **pollution** ở khu chợ gần nhà ngày càng nặng hơn. Từ 'pollution' trong câu trên có nghĩa là gì?",
    A: "Rác thải",
    B: "Ô nhiễm",
    C: "Sạch sẽ",
    D: "Bảo vệ",
    dapAn: "B"
  },
  {
    cau: 3,
    hoi: "Hai bạn quyết định cùng nhau **protect** khu vườn nhỏ sau trường bằng cách không xả rác. Từ 'protect' trong câu trên có nghĩa là gì?",
    A: "Phá hủy",
    B: "Xây dựng",
    C: "Bảo vệ",
    D: "Trồng cây",
    dapAn: "C"
  },
  {
    cau: 4,
    hoi: "Các bạn trong lớp cũng học cách **recycle** vỏ chai nhựa để làm đồ handmade. Từ 'recycle' trong câu trên có nghĩa là gì?",
    A: "Vứt bỏ",
    B: "Đốt cháy",
    C: "Chôn lấp",
    D: "Tái chế",
    dapAn: "D"
  },
  {
    cau: 5,
    hoi: "Cô giáo dặn cả lớp phải biết **conserve** nước sạch trong mùa hè này. Từ 'conserve' trong câu trên có nghĩa là gì?",
    A: "Lãng phí",
    B: "Tiêu thụ",
    C: "Bảo tồn, tiết kiệm",
    D: "Sản xuất",
    dapAn: "C"
  },
  {
    cau: 6,
    hoi: "Với Như Quỳnh, thời gian bên gia đình là điều **valuable** nhất trong cuộc sống. Từ 'valuable' trong câu trên có nghĩa là gì?",
    A: "Rẻ tiền",
    B: "Vô giá trị",
    C: "Cũ kỹ",
    D: "Quý giá",
    dapAn: "D"
  },
  {
    cau: 7,
    hoi: "May mắn là nhà Ngọc Trân có một chiếc xe đạp điện rất **convenient** để đi học. Từ 'convenient' trong câu trên có nghĩa là gì?",
    A: "Thuận tiện",
    B: "Bất tiện",
    C: "Đắt đỏ",
    D: "Nguy hiểm",
    dapAn: "A"
  },
  {
    cau: 8,
    hoi: "Phòng học mới của trường rất **spacious** nên các bạn có nhiều chỗ để vận động. Từ 'spacious' trong câu trên có nghĩa là gì?",
    A: "Chật chội",
    B: "Rộng rãi",
    C: "Tối tăm",
    D: "Ồn ào",
    dapAn: "B"
  },
  {
    cau: 9,
    hoi: "Giờ ra chơi, sân trường luôn **crowded** vì học sinh ùa ra rất đông. Từ 'crowded' trong câu trên có nghĩa là gì?",
    A: "Vắng vẻ",
    B: "Đông đúc",
    C: "Yên tĩnh",
    D: "Sạch sẽ",
    dapAn: "B"
  },
  {
    cau: 10,
    hoi: "Sau giờ học, hai bạn thích ngồi ở góc thư viện yên tĩnh, cảm giác thật **peaceful**. Từ 'peaceful' trong câu trên có nghĩa là gì?",
    A: "Yên bình",
    B: "Ồn ào",
    C: "Hỗn loạn",
    D: "Nguy hiểm",
    dapAn: "A"
  },
  {
    cau: 11,
    hoi: "Ngôi trường mới xây có kiến trúc rất **modern**. Từ 'modern' trong câu trên có nghĩa là gì?",
    A: "Cổ xưa",
    B: "Lạc hậu",
    C: "Truyền thống",
    D: "Hiện đại",
    dapAn: "D"
  },
  {
    cau: 12,
    hoi: "Trong khi đó, ngôi đình làng gần nhà Như Quỳnh lại mang nét **ancient** cổ kính. Từ 'ancient' trong câu trên có nghĩa là gì?",
    A: "Hiện đại",
    B: "Mới mẻ",
    C: "Cổ xưa",
    D: "Tương lai",
    dapAn: "C"
  },
  {
    cau: 13,
    hoi: "Mỗi năm, gia đình Ngọc Trân vẫn giữ **traditional** trong ngày Tết. Từ 'traditional' trong câu trên có nghĩa là gì?",
    A: "Hiện đại",
    B: "Cá nhân",
    C: "Ngẫu nhiên",
    D: "Truyền thống",
    dapAn: "D"
  },
  {
    cau: 14,
    hoi: "Một **custom** mà cả hai bạn đều thích là lì xì đầu năm. Từ 'custom' trong câu trên có nghĩa là gì?",
    A: "Luật pháp",
    B: "Tôn giáo",
    C: "Phong tục",
    D: "Ngôn ngữ",
    dapAn: "C"
  },
  {
    cau: 15,
    hoi: "Cuối tuần này, trường tổ chức **festival** chào mừng ngày hội đọc sách. Từ 'festival' trong câu trên có nghĩa là gì?",
    A: "Kỳ thi",
    B: "Lễ hội",
    C: "Hội chợ",
    D: "Cuộc họp",
    dapAn: "B"
  },
  {
    cau: 16,
    hoi: "Cả lớp cùng nhau **celebrate** sinh nhật của cô giáo chủ nhiệm. Từ 'celebrate' trong câu trên có nghĩa là gì?",
    A: "Ăn mừng, kỷ niệm",
    B: "Hủy bỏ",
    C: "Quên lãng",
    D: "Than phiền",
    dapAn: "A"
  },
  {
    cau: 17,
    hoi: "Ngọc Trân luôn **generous**, sẵn sàng chia sẻ đồ ăn với bạn bè. Từ 'generous' trong câu trên có nghĩa là gì?",
    A: "Hào phóng",
    B: "Keo kiệt",
    C: "Ích kỷ",
    D: "Lười biếng",
    dapAn: "A"
  },
  {
    cau: 18,
    hoi: "Như Quỳnh nổi tiếng là người **honest**, không bao giờ nói dối thầy cô. Từ 'honest' trong câu trên có nghĩa là gì?",
    A: "Dối trá",
    B: "Nhút nhát",
    C: "Trung thực",
    D: "Kiêu ngạo",
    dapAn: "C"
  },
  {
    cau: 19,
    hoi: "Để ôn thi vào 10, cả hai phải thật **patient** khi giải các bài toán khó. Từ 'patient' trong câu trên có nghĩa là gì?",
    A: "Nóng vội",
    B: "Cẩu thả",
    C: "Lười biếng",
    D: "Kiên nhẫn",
    dapAn: "D"
  },
  {
    cau: 20,
    hoi: "Thầy giáo dạy Văn rất **humorous** nên giờ học không bao giờ nhàm chán. Từ 'humorous' trong câu trên có nghĩa là gì?",
    A: "Nghiêm túc",
    B: "Hài hước",
    C: "Buồn bã",
    D: "Nhàm chán",
    dapAn: "B"
  },
  {
    cau: 21,
    hoi: "Trước kỳ thi thử, Như Quỳnh cảm thấy khá **confident** vì đã ôn tập kỹ. Từ 'confident' trong câu trên có nghĩa là gì?",
    A: "Lo lắng",
    B: "Tự tin",
    C: "Nhút nhát",
    D: "Chán nản",
    dapAn: "B"
  },
  {
    cau: 22,
    hoi: "Ngược lại, Ngọc Trân lại hơi **nervous** vì sợ quên kiến thức. Từ 'nervous' trong câu trên có nghĩa là gì?",
    A: "Tự tin",
    B: "Thoải mái",
    C: "Vui vẻ",
    D: "Lo lắng",
    dapAn: "D"
  },
  {
    cau: 23,
    hoi: "Sau buổi học thêm kéo dài, cả hai đều cảm thấy **exhausted**. Từ 'exhausted' trong câu trên có nghĩa là gì?",
    A: "Kiệt sức",
    B: "Tràn đầy năng lượng",
    C: "Thư giãn",
    D: "Hào hứng",
    dapAn: "A"
  },
  {
    cau: 24,
    hoi: "Khi nhận điểm 9 môn Anh, Như Quỳnh vô cùng **delighted**. Từ 'delighted' trong câu trên có nghĩa là gì?",
    A: "Thất vọng",
    B: "Tức giận",
    C: "Vui mừng",
    D: "Lo sợ",
    dapAn: "C"
  },
  {
    cau: 25,
    hoi: "Nhưng Ngọc Trân lại **disappointed** vì bài kiểm tra Toán bị mất điểm. Từ 'disappointed' trong câu trên có nghĩa là gì?",
    A: "Hài lòng",
    B: "Phấn khích",
    C: "Thất vọng",
    D: "Tự hào",
    dapAn: "C"
  },
  {
    cau: 26,
    hoi: "Cả hai luôn **curious** về những điều mới mẻ trong sách giáo khoa. Từ 'curious' trong câu trên có nghĩa là gì?",
    A: "Tò mò",
    B: "Thờ ơ",
    C: "Sợ hãi",
    D: "Chán nản",
    dapAn: "A"
  },
  {
    cau: 27,
    hoi: "Như Quỳnh rất **ambitious**, mong muốn đỗ vào trường chuyên. Từ 'ambitious' trong câu trên có nghĩa là gì?",
    A: "An phận",
    B: "Có tham vọng",
    C: "Lười biếng",
    D: "Rụt rè",
    dapAn: "B"
  },
  {
    cau: 28,
    hoi: "Cô bé cũng học cách **independent**, tự lên kế hoạch ôn tập cho mình. Từ 'independent' trong câu trên có nghĩa là gì?",
    A: "Phụ thuộc",
    B: "Ỷ lại",
    C: "Yếu đuối",
    D: "Độc lập",
    dapAn: "D"
  },
  {
    cau: 29,
    hoi: "Ngọc Trân thì luôn **responsible** với công việc lớp trưởng được giao. Từ 'responsible' trong câu trên có nghĩa là gì?",
    A: "Vô trách nhiệm",
    B: "Cẩu thả",
    C: "Ích kỷ",
    D: "Có trách nhiệm",
    dapAn: "D"
  },
  {
    cau: 30,
    hoi: "Bạn ấy luôn **punctual**, chưa bao giờ đi học muộn. Từ 'punctual' trong câu trên có nghĩa là gì?",
    A: "Trễ giờ",
    B: "Đúng giờ",
    C: "Chậm chạp",
    D: "Vội vàng",
    dapAn: "B"
  },
  {
    cau: 31,
    hoi: "Thầy cô đánh giá Ngọc Trân là một học sinh **reliable** trong mọi việc. Từ 'reliable' trong câu trên có nghĩa là gì?",
    A: "Không đáng tin",
    B: "Giả dối",
    C: "Đáng tin cậy",
    D: "Nguy hiểm",
    dapAn: "C"
  },
  {
    cau: 32,
    hoi: "Việc đạt danh hiệu học sinh giỏi là một **achievement** lớn với cả hai bạn. Từ 'achievement' trong câu trên có nghĩa là gì?",
    A: "Thành tựu",
    B: "Thất bại",
    C: "Lỗi lầm",
    D: "Khó khăn",
    dapAn: "A"
  },
  {
    cau: 33,
    hoi: "Kỳ thi vào 10 chính là một **opportunity** để các bạn bước vào ngôi trường mơ ước. Từ 'opportunity' trong câu trên có nghĩa là gì?",
    A: "Cơ hội",
    B: "Nguy hiểm",
    C: "Thử thách",
    D: "Trở ngại",
    dapAn: "A"
  },
  {
    cau: 34,
    hoi: "Nhưng đó cũng là một **challenge** không hề nhỏ đối với học sinh lớp 9. Từ 'challenge' trong câu trên có nghĩa là gì?",
    A: "Cơ hội dễ dàng",
    B: "Phần thưởng",
    C: "Sự nghỉ ngơi",
    D: "Thử thách",
    dapAn: "D"
  },
  {
    cau: 35,
    hoi: "Nhờ chăm chỉ luyện đề, điểm số của Ngọc Trân dần **improve** rõ rệt. Từ 'improve' trong câu trên có nghĩa là gì?",
    A: "Làm hỏng",
    B: "Cải thiện",
    C: "Giữ nguyên",
    D: "Bỏ qua",
    dapAn: "B"
  },
  {
    cau: 36,
    hoi: "Bố mẹ luôn **encourage** hai bạn cố gắng hết sức trong học tập. Từ 'encourage' trong câu trên có nghĩa là gì?",
    A: "Ngăn cản",
    B: "Chê bai",
    C: "Động viên, khuyến khích",
    D: "Phớt lờ",
    dapAn: "C"
  },
  {
    cau: 37,
    hoi: "Đôi khi áp lực điểm số lại **discourage** tinh thần của các bạn. Từ 'discourage' trong câu trên có nghĩa là gì?",
    A: "Động viên",
    B: "Khen ngợi",
    C: "Làm nản lòng",
    D: "Thúc đẩy",
    dapAn: "C"
  },
  {
    cau: 38,
    hoi: "Như Quỳnh nói tiếng Anh rất **fluent** nhờ luyện nghe mỗi ngày. Từ 'fluent' trong câu trên có nghĩa là gì?",
    A: "Ngập ngừng",
    B: "Trôi chảy, thông thạo",
    C: "Chậm chạp",
    D: "Sai ngữ pháp",
    dapAn: "B"
  },
  {
    cau: 39,
    hoi: "Trường học còn lắp đặt hệ thống điện **renewable** từ năng lượng mặt trời. Từ 'renewable' trong câu trên có nghĩa là gì?",
    A: "Có thể tái tạo",
    B: "Cạn kiệt",
    C: "Độc hại",
    D: "Đắt đỏ",
    dapAn: "A"
  },
  {
    cau: 40,
    hoi: "Với cả hai, những năm tháng học trò luôn là ký ức **precious** nhất. Từ 'precious' trong câu trên có nghĩa là gì?",
    A: "Rẻ tiền",
    B: "Tầm thường",
    C: "Nặng nề",
    D: "Quý giá",
    dapAn: "D"
  }
];
