ในตาราง User

GET /users/email/:email
ดึงข้อมูลผู้ใช้จากค่า email ใน URL โดยใช้ prisma.user.findUnique()
ถ้าไม่พบจะส่ง 404 และถ้าสำเร็จจะส่งข้อมูลผู้ใช้กลับเป็น JSON

DELETE /users/:id
ลบข้อมูลผู้ใช้ตาม Userid ที่รับจาก params
ใช้ prisma.user.delete() และส่งข้อความยืนยันเมื่อลบสำเร็จ

ในตาราง Post

POST /posts
สร้างโพสต์ใหม่จาก title, content, authorId
ใช้ prisma.post.create() แล้วส่งข้อมูลโพสต์ที่สร้างกลับ

GET /posts
ดึงข้อมูลโพสต์ทั้งหมด
ใช้ findMany() พร้อม include: { author: true } เพื่อแสดงข้อมูลผู้เขียน

GET /posts/:id
ดึงโพสต์รายการเดียวตาม postId
ถ้าไม่พบส่ง 404 ถ้าพบส่งข้อมูลโพสต์พร้อมผู้เขียน

PUT /posts/:id
อัปเดตข้อมูลโพสต์ตาม postId
สามารถแก้ไข title, content, published ได้

DELETE /posts/:id
ลบโพสต์ตาม postId
ใช้ prisma.post.delete() แล้วส่งข้อความยืนยันการลบสำเร็จ