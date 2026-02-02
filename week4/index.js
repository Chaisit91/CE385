
// // การใช้งานโมดูล HTTP ใน Node.js
// const http =require('http');

// //สร้าง Server แบบง่ายๆ
// const server = http.createServer((req,res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
// });

// //กำหนด port และเริ่ม Server
// server.listen(3000, '127.0.0.1',() => {
//     console.log("Server running at http://127.0.0.1:3000/");
// });

const express = require('express'); // นำเข้าโมดูล Express

const app = express();  // สร้างแอปพลิเคชัน Express

const port = 3000; // กำหนดพอร์ตที่เซิร์ฟเวอร์จะฟัง

// กำหนดเส้นทางสำหรับคำขอ GET ที่ราก "/"
app.get('/', (req, res) => {
    res.send('Hello, World!'); // ส่งข้อความตอบกลับ
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); // แจ้งว่าเซิร์ฟเวอร์กำลังทำงาน
});

const opration = require('./opration'); // นำเข้าโมดูล opration
console.log("Addition: " + opration('add', 4, 5));
console.log("Subtraction: " + opration('subtract', 10, 3));
console.log("Multiplication: " + opration('multiply', 5, 6));
console.log("Division: " + opration('divide', 8, 2));
