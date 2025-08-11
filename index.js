const express = require('express');
const app = express();
const Joi = require('joi')

app.use(express.json()); // Body parser

let courses = [
    { id: 1, name: "3D max" },
    { id: 2, name: "WEB" },
    { id: 3, name: "Android" },
    { id: 4, name: "ios" },
];

app.get('/', (req, res)=>{
    res.send("IT kurslarimizga xush kelibsiz")
})

app.get('/api/catigaries/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const findCourse = courses.find(course => course.id === courseId);

    if (!findCourse) {
        return res.status(404).send('Kitob topilmadi');
    }

    res.send(findCourse);
});

app.get('/api/catigaries', (req, res) => {
    res.send(courses);
});

app.post('/api/catigaries', (req, res) => {

    const courseSchema = Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z0-9\s.,'-]+$/).required().min(3)
    });


    const { error } = courseSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.status(201).send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});
