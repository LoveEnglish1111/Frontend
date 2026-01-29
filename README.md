# HƯỚNG DẪN SỬ DỤNG

## Cách dùng github cơ bản

Bạn nào biết dùng git rồi thì có thể skip đoạn này

### Tải và clone dự án
Hãy tải git thông qua link này https://git-scm.com/install/windows hoặc là có thể video này hướng dẫn: https://www.youtube.com/watch?v=4FjgUp0zgcM

Khi mà tải xong thì bạn nên clone dự án từ project này bằng cách nhập dòng code sau:
```
git clone https://github.com/LoveEnglish1111/Frontend.git
```

### Cách push code
Đây là 1 điều bắt buột mọi người phải làm tuần tự đó là: **Add -> Commit -> push**

**Đầu tiên là add file** rõ lệnh:
```
git add <filename>
```

Nếu bạn muốn add tất cả file thì viết dấu chấm
```
git add .
```

**Tiếp theo là commit code** rõ lệnh:
```
git commit -m <viết tin nhắn>
```

giả sử trong file code đó tôi đã thêm tính năng A thì ghi commit này:
```
git commit -m "Thêm tính năng A"
```

**Push code** rõ lệnh
```
git push
```

Lệnh này sẽ giúp bạn đăng code lên github.

Các bạn có thể xem hết video này để học thêm: https://www.youtube.com/playlist?list=PLyxSzL3F7485Xgn7novgNxnou8QU6i485

## Cách mở file project Frontend

sau khi đã clone project từ github, tiếp theo đó hãy rõ lệnh này trên terminal:
```
npm i
```
sau khi nhập xong lệnh đó thì trong project bạn sẽ thấy file **node_modules**, lưu ý đừng quan tâm tới file này, vì nó là thư viện của project

Tiếp đến chạy server frontend, hãy nhập lệnh này"
```
npm run dev
```
và nó sẽ cho bạn cái link và chỉ cần bấm là bạn sẽ vô website

**Lưu ý một chút** 
- Lúc code thì các bạn nên code trên file src, đây là toàn bộ code của dự án nhóm mình
- Khi mà bạn muốn thêm cac dữ liệu như hình ảnh, video hay âm thanh thì nên để trên file public
- **QUAN TRỌNG** khi mà viết code nên comment lại, vì code để cho người khác hiểu chứ không cho mình hiểu, khuyến khích comment bằng tiếng anh thay vì tiếng việt