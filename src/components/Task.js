import React from 'react'

const Task = ({task}) => {
    return (
        <div className="taskComponent">
            <div className="taskAttributes">
                <div>Task: </div>
                <div>{task.text}</div>
            </div>

            <div className="taskAttributes">
                <div>Category: </div>

            </div>


            <div className="taskAttributes">
                <div>Due Date: </div>
                <div>{task.date}</div>
            </div>

            <div className="taskAttributes">
                <div>Status: </div>
            </div>

            <div className="taskAttributes">
                <div>Priority: </div>
                <div>{task.priorityLevel}</div>
            </div>
        </div>
    )
}

export default Task
