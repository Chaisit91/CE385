# Week 11 

ระบบ Express API ที่ใช้ Gemini AI (Function Calling) เป็นตัวกลางรับคำถามจากผู้ใช้ แล้วให้ AI แปลงเป็น Prisma query เพื่อดึงข้อมูลจาก PostgreSQL โดยอัตโนมัติ
AI จะอ่าน Prisma Schema เพื่อทำความเข้าใจโครงสร้างฐานข้อมูล และเรียกใช้ tool `query` ผ่าน MCP Router เมื่อต้องการข้อมูลจริง


---