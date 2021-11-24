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

app.get('/tasks/today', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasksDueToday();
    result.then(data => res.json(data))
    .catch(err => console.log(err));
    // res.json({
    //     success: true
    // });
});

app.get('/tasks/tommorow', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasksDueTommorow();
    result.then(data => res.json(data))
    .catch(err => console.log(err));
    // res.json({
    //     success: true
    // });
});

app.get('/tasks/late', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasksLate();
    result.then(data => res.json(data))
    .catch(err => console.log(err));
    // res.json({
    //     success: true
    // });
});

app.get('/tasks/week', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasksDueWithinAWeek();
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
});


app.post('/category/new', (req, res) => {
    const {new_category} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewCategory(new_category);
    result.then(data => res.json(data))
    .catch(err => console.log(err));
});

// app.get('/category', (req, res) => {
//     var query = require('url').parse(req.url,true).query;
//     const {new_category} = query.name;
//     console.log(new_category);
//     const db = dbService.getDbServiceInstance();
//     const result = db.getNewCategoryId(new_category);
//     result.then(data => res.json(data))
//     .catch(err => console.log(err));
// })

app.post('/tasks/delete', (req, res) => {
    const {task_id} = req.body;
    console.log(task_id);
    const db = dbService.getDbServiceInstance();
    const result = db.deleteTask(task_id);
    result.then(data => res.json(data))
    .catch(err => console.log(err));
});

app.post('/tasks/update', (req, res) => {
    const {task_id, status} = req.body;
    console.log(task_id + status);
    const db = dbService.getDbServiceInstance();
    const result = db.updateTaskStatus(task_id, status);
    result.then(data => res.json(data))
    .catch(err => console.log(err));
});

app.post('/category/delete', (req, res) => {
    const {category_id} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteCategory(category_id);
    result.then(data => res.json(data))
    .catch(err => console.log(err));
});

app.post('/category/update/status', (req, res) => {
    const {category_id} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateTaskCategoryBeforeDelete(category_id);
    result.then(data => res.json(data))
    .catch(err => console.log(err));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));