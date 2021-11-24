import React from 'react'
import {useEffect, useState} from 'react';
import Task from './Task.js';

const ToDoContainer = () => {
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState([]);
    const [taskCategories, setTaskCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(''); // TODO: Implement logic for new category
    const [priorityLevel, setPriorityLevel] = useState(0);
    const [currentTaskCategory, setCurrentTaskCategory] = useState(0); 
    const [catergoryName, setCategoryName] = useState('');
    

    useEffect(() => {
        try {
            getTaskApiRequest();
            getExistingCategories();
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

    const getExistingCategories = async () => {
        const res = await fetch('http://localhost:5000/tasks/categories');
        const data = await res.json();
        console.log(data);
        setTaskCategories(data);

        console.log(taskCategories);
    }

    const postNewTaskApiRequest = async () => {
        const newTaskInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_text: taskDescription,
                category_id: currentTaskCategory,
                priority_level: priorityLevel,
                due_date: date,
                status: 'Active'
             })
           };


        const res = await fetch('http://localhost:5000/tasks/submit', newTaskInformation);
        console.log(res);
        const data = await res.json()
        console.log(data);
        getTaskApiRequest();
    }

    const postNewCategoryRequest = async () => {
        const newCategoryInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                new_category: newCategory
             })
           };

        const res = await fetch('http://localhost:5000/category/new', newCategoryInformation);
        const data = await res.json()
        console.log(data);
        getExistingCategories();
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // if(newCategory) {
        //     postNewCategoryRequest();
        // }

        // for(var i = 0; i < taskCategories.length; i++) {
            
        // }

       

        // const newTask = {
        //     task_text: taskDescription,
        //     category_name: catergoryName,
        //     priority_level: priorityLevel,
        //     due_date: date,
        //     status: 'Active'
        // }
     
        postNewTaskApiRequest();


    }

    // const deleteTaskRequest = async(taskId) => {
    //     // const deleteTaskInformation = {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json'},
    //     //     body: JSON.stringify({
    //     //         task_id: taskId
    //     //      })
    //     //    };
    //     // }

    //     // const res = await fetch('http://localhost:5000/tasks/delete', deleteTaskInformation);
    //     // const data = await res.json()
    //     // console.log(data);
    //     // getExistingCategories();
    // }

    const deleteTaskRequest = async (taskId) => {
        const deleteTaskInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_id: taskId
             })
           };

        const res = await fetch('http://localhost:5000/tasks/delete', deleteTaskInformation);
        const data = await res.json()
        console.log(data);
        getTaskApiRequest();
    }




    const addNewTask = (newTask) => {
        setTasks([...tasks, newTask]);
        console.log(tasks);
    }

    return (
        <div className="toDoContainer">
            <h1> To Do List! </h1>

            <form className="form" onSubmit={postNewCategoryRequest}>
            <div>Create New Category: </div>
                <input type="text" placeholder="New Category" value={newCategory} onChange={((e) => setNewCategory(e.target.value))}></input>
                <button className="addTask">Create New Category</button>
            </form>

            <form className="form" onSubmit={onSubmit}>
                    <div>Task Description: </div>
                     <input type="text" placeholder="Enter your task" value={taskDescription} onChange={((e) => setTaskDescription(e.target.value))}></input>

                <div>Select Existing Category: </div>
                <select className="" value={currentTaskCategory} onChange={((e) => setCurrentTaskCategory(e.target.value))}>
                <option value="0" selected disabled hidden>Choose here</option>
                {taskCategories.map((category) => (
                    <option className="" value={category.category_id}>
                    {category.category_name}
                    </option>
                ))}
                </select>

                <div>Choose Priority Level: </div>
                <select className="" value={priorityLevel} onChange={((e) => setPriorityLevel(e.target.value))}>
                    <option value="0" selected disabled hidden>Choose here</option>
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
                <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)}></Task>
                ))}
            </div>
          

        </div>
    )
}

export default ToDoContainer
