import React from 'react'

const Task = ({task}) => {
    return (
        <div className="taskComponent">
            <div>
                <div>Task: </div>
                <div>{task.text}</div>
            </div>

            <div>
                <div>Due Date: </div>
                <div>{task.date}</div>
                
            </div>
        </div>
    )
}

export default Task
