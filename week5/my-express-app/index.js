const express = require('express');
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: "node", age: 18 },
    { id: 2, name: "express", age: 19 },
    { id: 3, name: "javascriot", age: 20 },
];
// middleware ตรวจสอบข้อมูล

const validateStudent = (req, res, next) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).send("Invalid data");
    }
    next();
};
// GET แสดงนักศึกษาทั้งหมด
app.get('/students', (req, res) => {
    res.send(students)
})
// GET แสดงนักศึกษาตาม ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        res.send(student);
    } else {
        res.status(404).send("Error 404: Student not found");
    }
})
// POST เพิ่มนักศึกษาใหม่
app.post('/students', validateStudent, (req, res) => {
    const { name, age } = req.body
    const newStudent = {
        id: students.length + 1,
        name,
        age
    };

    students.push(newStudent);
    res.send(newStudent);
});
// PUT แก้ไขนักศึกษาตาม ID
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.send(student);
});
// DELETE ลบนักศึกษาตาม ID
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).send("Student not found");
    }

    students.splice(index, 1);
    res.send("Deleted");
});

app.listen(3000, () => {
    console.log('Server running on 3000');
});

