# Week 11 

ระบบ Express API ที่ใช้ Gemini AI (Function Calling) เป็นตัวกลางรับคำถามจากผู้ใช้ แล้วให้ AI แปลงเป็น Prisma query เพื่อดึงข้อมูลจาก PostgreSQL โดยอัตโนมัติ
AI จะอ่าน Prisma Schema เพื่อทำความเข้าใจโครงสร้างฐานข้อมูล และเรียกใช้ tool `query` ผ่าน MCP Router เมื่อต้องการข้อมูลจริง

หลักการทำงาน

1. ผู้ใช้ส่งคำถามมาที่ `POST /chat` ซึ่ง chatRouter จะรับและส่งต่อไปยัง `askAI()` ใน llm.ts
2. `schemaReader.ts` อ่านไฟล์ `schema.prisma` ด้วย Regex แล้วแปลงเป็น text สรุป Model และ Field ทั้งหมด
3. Text ของ Schema จะถูกนำไปใส่ใน System Instruction ของ Gemini AI เพื่อให้ AI รู้จักโครงสร้างฐานข้อมูล
4. Gemini AI (gemini-2.5-flash-lite) ถูกกำหนด tool ชื่อ `query` ผ่าน Function Calling เพื่อใช้ดึงข้อมูลจาก DB
5. เมื่อ AI ต้องการข้อมูลจริง จะเรียก function `query` พร้อมระบุ model, action, และ args เช่น where/orderBy/take
6. `queryTool.ts` ตรวจสอบ input ด้วย Zod Schema และอนุญาตเฉพาะ action อ่านอย่างเดียว (findMany, findFirst, findUnique, count)
7. Prisma Client ใช้ adapter `PrismaPg` เชื่อมต่อ PostgreSQL แล้ว execute query จริงและส่งผลลัพธ์กลับไปให้ AI
8. AI นำผลลัพธ์จากฐานข้อมูลมาสรุปเป็นภาษาเดียวกับที่ผู้ใช้ถาม แล้วตอบกลับเป็น JSON ผ่าน `/chat`

---