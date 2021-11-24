const express = require('express');

const app = express();
const cors = require('cors');
const { response } = require('express');
const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tasks', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasks();
    result.then(data => res.json(data))
    .catch(err => console.log(err));
    // res.json({
    //     success: true
    // });
});

app.get('/tasks/categories', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTaskCategories();
    result.then(data => res.json(data))
    .catch(err => console.log(err));
})

app.post('/tasks/submit', (req, res) => {
    // console.log("testing post request");
    console.log(req.body);
    const {task_text, category_id, priority_level, due_date, status} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewTask(task_text, category_id, priority_level, due_date, status);
    result.then(data => res.json({success: true}))
    .catch(err => console.log(err));
    // const requestBody = req.body;
    // const taskText = requestBody.text_text;
    // const categoryName = requestBody.category_name;
    // const priorityLevel = requestBody.priority_level;
    // const dueDate = requestBody.due_date;
    // const status = requestBody.status;

   
    // res.json({
    //     success: true
    // });
    // console.log(req.body);
    // const newTask = req.body;
    // console.log(newTask.task);
    // res.send('Testing post request')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));