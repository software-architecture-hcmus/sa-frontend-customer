# Realtime notification
- Hiện tại cho mục đích testing, cron job sẽ chạy mỗi 1 phút và check các event sẽ bắt đầu trong vòng 5 phút để thông báo cho người dùng. Sau này khi nộp mình sẽ chỉnh xuống hết 1 phút.
- Cách test: 
    - Tạo một event có event.start cách thời gian hiện tại trong khoảng từ [2,5] phút (tạo băng db hay admin/business UI cũng được)
    - Bấm subcribe event này bằng acc customer (tạm gọi là acc A. Lưu ý: chỉ subcribe được event up_coming, ko subcribe được ongoing và ended)
    - Sử dụng một acc customer và login vào, nhưng không subcribe event này (tạm gọi là acc B)
    - Cron job chạy sau một phút và thông báo event sắp bắt đầu cho acc A, không thông báo cho acc B (do acc A có subcribe event)


# Note

- copy .env.development ở đây bỏ dô repo
- lấy access Token của firebase: dùng user = useContext(UserContext) -> user.accessToken

https://studenthcmusedu-my.sharepoint.com/my?id=%2Fpersonal%2F21120551%5Fstudent%5Fhcmus%5Fedu%5Fvn%2FDocuments%2FKien%20truc%20phan%20mem&sortField=LinkFilename&isAscending=true

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# sa-frontend
