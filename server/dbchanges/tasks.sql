DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    task_id INT(6) AUTO_INCREMENT,
    task_text VARCHAR(200) NOT NULL,
    due_date DATE NOT NULL,
    category_id INT(6),
    priority_level TINYINT(4),
    status VARCHAR(50),
    PRIMARY KEY(task_id),
	KEY(category_id)
);