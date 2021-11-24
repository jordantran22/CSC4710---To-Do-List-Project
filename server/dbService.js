const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: "jordan",
    database: "todo",
    port: "3306"
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getTasks() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks JOIN category ON tasks.category_id = category.category_id;";
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getTaskCategories() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT category_id, category_name FROM category;";
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewTask(task) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tasks VALUES ();";
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;