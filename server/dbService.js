const mysql = require('mysql');
const credentials = require('./credentials'); // Create credenntials.json -> { "user" : "xxxxx", "password": "xxxxxx" }
let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: credentials.user,
    password: credentials.password,
    database: "todo",
    port: "3306",
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
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks LEFT JOIN category ON tasks.category_id = category.category_id ORDER BY tasks.priority_level ASC;";
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

    async getTasksDueTommorow() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks LEFT JOIN category ON tasks.category_id = category.category_id WHERE tasks.due_date = CURDATE() + INTERVAL 1 DAY ORDER BY tasks.priority_level ASC;";
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


    async getTasksDueToday() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks LEFT JOIN category ON tasks.category_id = category.category_id WHERE tasks.due_date = CURDATE() AND tasks.status = 'Active' ORDER BY tasks.priority_level ASC;";
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

    async getTasksDueWithinAWeek() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks LEFT JOIN category ON tasks.category_id = category.category_id WHERE tasks.due_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY ORDER BY tasks.priority_level ASC;";
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

    async getTasksLate() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT task_id, task_text, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date, priority_level, category_name, status FROM tasks LEFT JOIN category ON tasks.category_id = category.category_id WHERE tasks.due_date < CURDATE() AND tasks.status = 'Active' ORDER BY tasks.priority_level ASC;";
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

    async insertNewTask(task_text, category_id, priority_level, due_date, status) {
        try {
            console.log(status);
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tasks (task_text, category_id, priority_level, due_date, status) VALUES (?,?,?,?,'Active');";
                connection.query(query, [task_text, category_id, priority_level, due_date, status], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            //console.log(insertTask);
            // return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewCategory(category_name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO category (category_name) VALUES (?);";
                connection.query(query, [category_name], (err, results) => {
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

    // async getNewCategoryId(new_category) {
    //     try {
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "SELECT category_id FROM category WHERE category_name = ?;";
    //             connection.query(query, [new_category], (err, results) => {
    //                 if(err) reject(new Error(err.message));
    //                 resolve(results);
    //             });
    //         })
            
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async deleteTask(task_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM tasks WHERE task_id = (?);";
                connection.query(query, [task_id], (err, results) => {
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

    async updateTaskStatus(task_id, status) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE tasks SET status = (?) WHERE task_id = (?);";
                connection.query(query, [status, task_id], (err, results) => {
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

    async deleteCategory(category_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM category WHERE category_id = (?);";
                connection.query(query, [category_id], (err, results) => {
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

    async updateTaskCategoryBeforeDelete(category_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE tasks SET category_id = NULL WHERE tasks.category_id = (?);";
                connection.query(query, [category_id], (err, results) => {
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