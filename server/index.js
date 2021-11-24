const express = require('express');

const app = express();
const cors = require('cors');
// const { response } = require('express');
const dbService = require('./dbService');

app.use(cors());
app.get('/tasks', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getTasks();
    result.then(data => res.json(data))
    .catch(err => console.log(err))
    // res.json({
    //     success: true
    // });
});

app.post('/tasks/new', (req, res) => {
    console.log(req.body);
    // const newTask = req.body;
    // console.log(newTask.task);
    // res.send('Testing post request')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));