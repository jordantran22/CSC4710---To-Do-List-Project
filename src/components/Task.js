import React from 'react'
import {useEffect, useState} from 'react';

const Task = ({task, deleteTask, getTasks}) => {
    const [taskStatus, setTaskStatus] = useState(task.status);

    const setStatus = () => {
        if(task.status === 'Active') {
            setTaskStatus('Completed');
        } else if(task.status === 'Completed') {
            setTaskStatus('Active');
        }

        updateStatusRequest();
        
    }

    const updateStatusRequest = async () => {
        const statusInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_id: task.task_id,
                status: taskStatus
             })
           };

        const res = await fetch('http://localhost:5000/tasks/update', statusInformation);
        const data = await res.json()
        console.log(data);
        getTasks();
    }

    return (
        <div className="taskContainer">

            <div className={task.status === 'Active' ? 'taskComponent' : 'taskComponentCompleted'}>
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
                <div className="checkButton" onClick={setStatus}>  ✓</div>
            </div>
        </div>
    )
}

export default Task
