import React from 'react'
import {useEffect, useState} from 'react';
import Task from './Task.js';

const ToDoContainer = () => {
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [priorityLevel, setPriorityLevel] = useState(1);
    const [currentTaskCategory, setCurrentTaskCategory] = useState(''); 
    const [categories, setCategories] = useState([]); // onEffect -> make api request for categories
    

    useEffect(() => {
        try {
            getTaskApiRequest();
        } catch (e) {
            console.log(e)
        }
    }, []);

    const getTaskApiRequest = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        console.log(res);
        const data = await res.json();
        console.log(data);
        setTasks(data);

        console.log(tasks);
    }

    const postNewTaskApiRequest = async (newTask) => {
        // const newTaskInformation = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        //     body: JSON.stringify({
        //         name: "jordan"
        //      })
        //    };

        // const res = await fetch('http://localhost:5000/tasks/new', newTaskInformation);
        // console.log(res);
        // const data = await res.json()
        // console.log(data);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        //  TODO: broken right now, fix later 
        if(newCategory) {
            setCurrentTaskCategory(newCategory);
        } else if(!taskCategory && newCategory){
            setCurrentTaskCategory(newCategory);
        }

        const newTask = {
            text: taskDescription,
            category: currentTaskCategory,
            priorityLevel: priorityLevel,
            date: date,
            status: 'Active'
        }
        addNewTask(newTask);
        postNewTaskApiRequest(newTask);


    }
    const addNewTask = (newTask) => {
        setTasks([...tasks, newTask]);
        console.log(tasks);
    }

    return (
        <div className="toDoContainer">
            <h1> To Do List! </h1>
            <form className="form" onSubmit={onSubmit}>
                    <div>Task Description: </div>
                     <input type="text" placeholder="Enter your task" value={taskDescription} onChange={((e) => setTaskDescription(e.target.value))}></input>
               

                <div>Create New Category: </div>
                <input type="text" placeholder="New Category" value={newCategory} onChange={((e) => setNewCategory(e.target.value))}></input>

                <div>Select Existing Category: </div>
                <select className="" value={taskCategory} onChange={((e) => setTaskCategory(e.target.value))}>
                <option value="" selected disabled hidden>Choose here</option>
                    {Object.entries(categories).map(([key, value]) => {
                        return (
                        <option className="" value={key}>
                            {value}
                        </option>
                        );
                    })}
                </select>

                <div>Choose Priority Level: </div>
                <select className="" value={priorityLevel} onChange={((e) => setPriorityLevel(e.target.value))}>
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <div>Pick A Due Date: </div>
                <input type="date" value={date} onChange={((e) => setDate(e.target.value))}/>
                <button className="addTask">Add Task</button>
            </form>

            <br />
            <h1>Current Tasks: </h1>
            {tasks.length < 1 ? <h1>All Tasks Completed!</h1> : <div></div>}
           
            <div>
                {tasks.map((task) => (
                <Task task={task}></Task>
                ))}
            </div>
          

        </div>
    )
}

export default ToDoContainer
