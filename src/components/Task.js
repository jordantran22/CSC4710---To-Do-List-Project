import React from 'react'

const Task = ({task, deleteTask}) => {
    return (
        <div className="taskContainer">

            <div className="taskComponent">
                <div className="taskAttributes">
                    <div className="attributeKey">Task: </div>
                    <div className="attributeValue">{task.task_text}</div>
                </div>

                <div className="taskAttributes">
                    <div className="attributeKey">Category: </div>
                    <div className="attributeValue">{task.category_name}</div>
                </div>


                <div className="taskAttributes">
                    <div className="attributeKey">Due Date: </div>
                    <div className="attributeValue">{task.due_date}</div>
                </div>

                <div className="taskAttributes">
                    <div className="attributeKey">Status: </div>
                    <div className="attributeValue">{task.status}</div>
                </div>

                <div className="taskAttributes">
                    <div className="attributeKey">Priority: </div>
                    <div className="attributeValue">{task.priority_level}</div>
                </div>
            </div>

            <div className="completedAndDeletedButtons" >
                <div className="deleteButton" onClick={deleteTask}> X </div>
                <div className="checkButton">  ✓</div>
            </div>
        </div>
    )
}

export default Task
