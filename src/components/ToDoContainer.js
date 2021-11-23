import React from 'react'
import {useEffect, useState} from 'react';
import Task from './Task.js';

const ToDoContainer = () => {
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
   
        const newTask = {
            id:  Math.floor(Math.random() * 10000) + 1,
            text: taskDescription,
            date: date
        }
        addNewTask(newTask);
    }
    const addNewTask = (newTask) => {
        setTasks([...tasks, newTask]);
        console.log(tasks);
    }

    return (
        <div className="toDoContainer">
            <h1> To Do List! </h1>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" placeholder="Enter your task" value={taskDescription} onChange={((e) => setTaskDescription(e.target.value))}></input>
                <input type="date" value={date} onChange={((e) => setDate(e.target.value))}/>
                <input type="submit"></input>
            </form>

           
            <div>
                {tasks.map((task) => (
                <Task task={task}></Task>
                ))}
            </div>
          

        </div>
    )
}

export default ToDoContainer
