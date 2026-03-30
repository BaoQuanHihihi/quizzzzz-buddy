export const SUBJECT_NAME = "Nhập môn AI - IT3160";

export const ALL_QUESTIONS = [

{
  text: "Các lĩnh vực nào được xem là nền tảng của trí tuệ nhân tạo?",
  options: ["Chính trị học (quản trị, phân tích hoạt động của xã hội, con người)", "Vật lý (nghiên cứu vật chất, tính toán chuyển động)", "Logic (đánh giá các luận cứ, phương pháp suy diễn)", "Toán học (biểu diễn hình thức, lý thuyết tính toán, tối ưu hóa)", "Kinh tế học (hàm lợi ích, lý thuyết ra quyết định)"],
  answer: [2, 3, 4]
},
{
  text: "GoogleBrain có đặc điểm gì nổi bật so với các hệ thống trí tuệ nhân tạo trước đó?",
  options: ["Dán nhãn (ví dụ mèo hay đối tượng khác) để đào tạo (train) hệ thống", "Sử dụng số lượng máy tính máy tính quy mô lớn, lên đến hàng ngàn máy tính", "Đạt được độ chính xác cao (xấp xỉ 80%) phát hiện khuôn mặt, các bộ phận cơ thể người với các hình ảnh phổ biến trên YouTube", "Tạo ra được các gương mặt giống như người thật"],
  answer: [1, 2]
},
{
  text: "Thành phần của một tác tử bao gồm ...",
  options: ["Ánh xạ.", "Kiến trúc và chương trình.", "Cảm nhận từ môi trường.", "Kiến trúc."],
  answer: [1]
},
{
  text: "Tác tử (Agents) được mô tả như sau:",
  options: ["Môi trường mà tác tử thực hiện", "Các cảm biến và bộ phận hoạt động - Sensors and Actuators", "Cảm nhận không liên tục", "Hàm tác tử - Agent function"],
  answer: [3]
},
{
  text: "Các sự kiện nào sau đây thể hiện sự phát triển trong lĩnh vực trí tuệ nhân tạo giai đoạn 1980-1990?",
  options: ["Sự xuất hiện bùng nổ của các hệ chuyên gia", "Trí tuệ nhân tạo trở thành một lĩnh vực khoa học", "Chương trình cờ vua Samuel", "Hệ thống AlphaGo của Google đánh bại kỳ thủ cờ vây hàng đầu"],
  answer: [0, 1]
},
{
  text: "Mục đích chính khi xây dựng hệ chuyên gia là làm cho máy:",
  options: ["Suy nghĩ hợp lý", "Suy nghĩ như con người", "Hành động hợp lý", "Hành động như con người"],
  answer: [1]
},
{
  text: "Các hệ thống TTNT được phát triển trên quan điểm nào sau đây?",
  options: ["Các hệ thống suy nghĩ (thông minh) như con người", "Các hệ thống suy nghĩ một cách hợp lý", "Các hệ thống hành động (thông minh) như con người", "Các hệ thống suy nghĩ và hành động một cách hợp lý", "Các hệ thống hành động một cách hợp lý"],
  answer: [1]
},
{
  text: "Kiểu môi trường nào sau đây là của trò chơi ô chữ (puzzle)?",
  options: ["Động", "Liên tục", "Bán động", "Tĩnh"],
  answer: [3]
},
{
  text: "Hãy trả lời đúng nhất các kiểu tác tử cơ bảns?",
  options: ["Tác tử phản xạ đơn giản (simple reflex agents), Tác tử phản xạ dựa trên mô hình (model-based reflex agents), Tác tử dựa trên mục tiêu (goal-based agents), Tác tử dựa trên lợi ích (utility-based agents)", "Tác tử phản xạ đơn giản (simple reflex agents)", "Tác tử phản xạ đơn giản (simple reflex agents), Tác tử phản xạ dựa trên mô hình (model-based reflex agents)", "Tác tử dựa trên lợi ích (utility-based agents)"],
  answer: [0]
},
{
  text: "Để thiết kế một tác tử thông minh (hợp lý), trước tiên cần phải xác định (thiết lập) các giá trị của các thành phần của PEAS với câu trả lời đúng nhất",
  options: ["Actuators: Các bộ phận hành động và Sensors: Các bộ phận cảm biến", "Environment: Môi trường xung quanh", "Performance measure: Tiêu chí đánh giá hiệu quả hoạt động; Environment: Môi trường xung quanh; Actuators: Các bộ phận hành động và Sensors: Các bộ phận cảm biến", "Performance measure: Tiêu chí đánh giá hiệu quả hoạt động"],
  answer: [2]
},
{
  text: "Tìm kiếm sâu dần là:",
  options: ["Tối ưu (khi trọng số cạnh bằng nhau và lớn hơn 0)", "Độ phức tạp thời gian lớn hơn nhiều tìm kiếm sâu", "Hoàn chỉnh", "Hiệu quả"],
  answer: [0, 2]
},
{
  text: "Với phần lớn các bài toán thực tế, tìm kiếm sâu có độ phức tạp về bộ nhớ nhỏ hơn so với tìm kiếm rộng:",
  options: ["True", "False: tìm kiếm rộng có độ phức tạp về bộ nhớ nhỏ hơn so với tìm kiếm sâu", "False: tìm kiếm rộng có độ phức tạp về bộ nhớ bằng tìm kiếm sâu"],
  answer: [0]
},
{
  text: "Trong giải thuật tìm kiếm A*, hàm đánh giá (evaluation function) xác định giá trị gì?",
  options: ["Chi phí của đường đi từ nút hiện tại đến nút đích", "Chi phí ước lượng của đường đi từ nút đầu đến nút đích và đi qua nút hiện tại", "Chi phí trung bình của các đường đi từ nút đầu đến nút đích", "Chi phí ước lượng của đường đi từ nút đầu đến nút hiện tại"],
  answer: [1]
},
{
  text: "Tại sao tìm kiếm với tri thức bổ sung (informed search) lại hiệu quả hơn tìm kiếm cơ bản (uninformed search)?",
  options: ["Tìm kiếm với tri thức bổ sung sử dụng các thông tin trong mô tả của bài toán tìm kiếm", "Tìm kiếm với tri thức bổ sung đảm bảo luôn tìm được lời giải tối ưu toàn cục", "Tìm kiếm với tri thức bổ sung có thể tránh việc phải xét tất cả các trạng thái trong không gian tìm kiếm", "Tìm kiếm với tri thức bổ sung khai thác tri thức cụ thể của bài toán thực tế"],
  answer: [2, 3]
},
{
  text: "Các ưu điểm của tìm kiếm cục bộ:",
  options: ["Luôn tìm được lời giải (nếu có)", "Tìm được lời giải tối ưu", "Tìm lời giải trong không gian rộng lớn vô tận", "Dung lượng bộ nhớ không đổi"],
  answer: [2, 3]
},
{
  text: "Giải thuật nào sau đây xem xét đến ước lượng tới nút đích?",
  options: ["Best-first search", "Greedy best-first search", "Depth-first search", "A* search"],
  answer: [1, 3]
},
{
  text: "Một giải thuật tìm kiếm muốn đảm bảo tính hoàn chỉnh (complete) và tối ưu (optimal) thì phải xét tất cả các đường đi dẫn đến nút đích.",
  options: ["True", "False"],
  answer: [1]
},
{
  text: "Giả sử v(n) thể hiện giá trị ước lượng của nút n. Trong quá trình tìm kiếm của giải thuật Alpha-Beta Pruning, nút n có thể thuộc đường đi dẫn đến lời giải nếu ...",
  options: ["Alpha ≥ v(n) ≥ Beta", "Alpha ≤ v(n) ≤ Beta", "v(n) > Beta", "v(n) < Alpha"],
  answer: [1]
},
{
  text: "Giải thuật tìm kiếm MiniMax có sử dụng cắt tỉa Alpha-Beta tìm được các nước đi (moves) có chất lượng tốt hơn là không sử dụng cắt tỉa.",
  options: ["True", "False"],
  answer: [1]
},
{
  text: "Các giá trị của tìm kiếm alpha-beta được cập nhật ở đâu?",
  options: ["Không câu trả lời nào (ở trên/dưới) là đúng", "Tại trạng thái ban đầu", "Tại trạng thái cuối cùng", "Trong quá trình tìm kiếm"],
  answer: [3]
}

];
