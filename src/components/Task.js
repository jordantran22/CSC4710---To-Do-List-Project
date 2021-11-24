import React from 'react'

const Task = ({task}) => {
    return (
        <div className="taskComponent">
            <div className="taskAttributes">
                <div>Task: </div>
                <div>{task.task_text}</div>
            </div>

            <div className="taskAttributes">
                <div>Category: </div>
                <div>{task.category_name}</div>
            </div>


            <div className="taskAttributes">
                <div>Due Date: </div>
                <div>{task.due_date}</div>
            </div>

            <div className="taskAttributes">
                <div>Status: </div>
                <div>{task.status}</div>
            </div>

            <div className="taskAttributes">
                <div>Priority: </div>
                <div>{task.priority_level}</div>
            </div>
        </div>
    )
}

export default Task
