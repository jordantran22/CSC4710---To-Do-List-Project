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

    const [tasksDueToday, setTasksDueToday] = useState([]);
    const [tasksLate, setTasksLate] = useState([]);
    const [tasksDueTommorow, setTasksDueTommorow] = useState([]);
    const [tasksDueWithinWeek, setTasksDueWithinWeek] = useState([]);
    const [tasksWeeklyReport, setTasksWeeklyReport] = useState([]);
    const [weekdate, setWeekdate] = useState([]);
    const [view, setView] = useState('All');
    const [deletingCategory, setDeletingCategory] = useState(0);
    const [editCategory, setEditCategory] = useState(false);
    

    useEffect(() => {
        try {
            getTaskApiRequest();
            getExistingCategories();
            getTasksDueTodayRequest();
            getTasksLateRequest();
        } catch (e) {
            console.log(e)
        }
    }, []);

    const getWeekFromDate = (date) => {
        let d = new Date(date);
        let n = d.getDay();
        let weekNumber = Math.ceil((d.getDate() + (6 - n)) / 7);
        return weekNumber;
    }

    const getTasksDueTodayRequest = async () => {
        const res = await fetch('http://localhost:5000/tasks/today');
        console.log(res);
        const data = await res.json();
        setTasksDueToday(data);

        console.log(tasksDueToday);
    }

    const getTasksDueTommorowRequest = async () => {
        const res = await fetch('http://localhost:5000/tasks/tommorow');
        console.log(res);
        const data = await res.json();
        setTasksDueTommorow(data);

        console.log(tasksDueTommorow);
    }
    
    const getTaskDueWithinWeek = async() => {
        const res = await fetch('http://localhost:5000/tasks/week');
        console.log(res);
        const data = await res.json();
        setTasksDueWithinWeek(data);

        console.log(tasksDueWithinWeek);
    }

    const getTasksByWeekNumber = async (weekdate) => {
        const res = await fetch(`http://localhost:5000/tasks/week/"${weekdate}""`);
        console.log(res);
        const data = await res.json();
        setTasksWeeklyReport(data);

        console.log(tasksWeeklyReport);
    }

    const getTasksLateRequest = async () => {
        const res = await fetch('http://localhost:5000/tasks/late');
        console.log(res);
        const data = await res.json();
        setTasksLate(data);

        console.log(tasksLate);
    }

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
        // getTaskApiRequest();
        getViewTasks(view);
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

    
     
        postNewTaskApiRequest();


    }

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

        // if (view === 'All') {
        //     getTaskApiRequest();
        // } else if (view === 'Due Today') {
        //     getTasksDueTodayRequest();
        // } else if (view === 'Late') {
        //     getTasksLateRequest();
        // }

        // getTaskApiRequest();
        getViewTasks(view);

    }

    const getViewTasks = (currentView) => {
     
        if(currentView === 'Due Today') {
            getTasksDueTodayRequest();
        }  else if(currentView === 'Late') {
            getTasksLateRequest();
        } else if(currentView === 'All') {
            getTaskApiRequest();
        } else if(currentView === 'Due Tommorow') {
            getTasksDueTommorowRequest();
        } else if(currentView === 'Due In A Week') {
            getTaskDueWithinWeek();
        } else if(currentView === 'Weekly Report') {
            getTasksByWeekNumber(weekdate);
        }

        setView(currentView);
    }

    const deleteCategoryRequest = async (e) => {
        const deleteCategoryInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                category_id: deletingCategory
             })
           };

        const res = await fetch('http://localhost:5000/category/delete', deleteCategoryInformation);
        getExistingCategories();
        getViewTasks(view);
        
        // const data = await res.json()
        // console.log(data);
    }

    const updateCategoryBeforeDelete = async (e) => {
        e.preventDefault();
        const deleteCategoryInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                category_id: deletingCategory
             })
           };
           console.log(deletingCategory);

        //    fetch('http://localhost:5000/category/update/status')
        //    .then(deleteCategoryRequest());
           

     const res = await fetch('http://localhost:5000/category/update/status', deleteCategoryInformation);
     deleteCategoryRequest();
    
    }

    const setEditCategoryView = () => {
        setEditCategory(!editCategory);
    }

    return (
        <div className="toDoContainer">
            <h1> To Do List! </h1>

            <button className="editCategoryButton form" onClick={setEditCategoryView}>Edit Categories! <i class='bx bxs-down-arrow-circle'></i></button>

            {editCategory ? 
            
                <div className="editCategoryContainer">
                    <form className="form" onSubmit={postNewCategoryRequest}>
            <div>Create New Category: </div>
                <input type="text" placeholder="New Category" value={newCategory} onChange={((e) => setNewCategory(e.target.value))}></input>
                <button className="addTask">Create New Category</button>
            </form>

            <form className="form" onSubmit={updateCategoryBeforeDelete}>
            <div>Delete Category: </div>
                 <select className="" value={deletingCategory} onChange={((e) => setDeletingCategory(e.target.value))}>
                <option value="0" selected disabled hidden>Choose here</option>
                {taskCategories.map((category) => (
                    <option className="" value={category.category_id}>
                    {category.category_name}
                    </option>
                ))}
                </select>
                <button className="addTask">Delete This Category</button>
            </form>

                </div> : <div></div>
            }
            {/* <form className="form" onSubmit={postNewCategoryRequest}>
            <div>Create New Category: </div>
                <input type="text" placeholder="New Category" value={newCategory} onChange={((e) => setNewCategory(e.target.value))}></input>
                <button className="addTask">Create New Category</button>
            </form>

            <form className="form" onSubmit={updateCategoryBeforeDelete}>
            <div>Delete Category: </div>
                 <select className="" value={deletingCategory} onChange={((e) => setDeletingCategory(e.target.value))}>
                <option value="0" selected disabled hidden>Choose here</option>
                {taskCategories.map((category) => (
                    <option className="" value={category.category_id}>
                    {category.category_name}
                    </option>
                ))}
                </select>
                <button className="addTask">Delete This Category</button>
            </form> */}


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
        
        <h1> Change Tasks View List </h1>
           <form className="form">
           <select className="" value={view} onChange={((e) => getViewTasks(e.target.value))}>
                    <option value="All">All</option>
                    <option value="Due Today">Due Today</option>
                    <option value="Due Tommorow">Due Tommorow</option>
                    <option value="Late">Late Tasks</option>
                    <option value="Due In A Week">Due In A Week</option>
                    <option value="Weekly Report">Weekly Report</option>
                </select>
           </form>

           {
               view === 'Due Today' ? <div>
                {tasksDueToday.length < 1 ? <h1>No Tasks Due Today!</h1> : <h1>Tasks Due Today: </h1>}
                    {tasksDueToday.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksDueTodayRequest()}></Task>
                    ))}
             </div> : <div> </div>
           }

           {
               view === 'All' && tasks.length > 0 ? 

                <div>
                    
                      {/* <div>
                        {tasksDueToday.map((task) => (
                        <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksDueTodayRequest()}></Task>
                        ))}
                      </div>
    
                     
                      <div>
                        {tasksLate.map((task) => (
                        <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksLateRequest()}></Task>
                        ))}
                      </div> */}
    
                      
                      <div>
                      {tasks.length < 1 ? <h1>All Tasks Completed!</h1> : <h1>All Tasks: </h1>}
                        {tasks.map((task) => (
                        <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTaskApiRequest()}></Task>
                        ))}
                     </div>
                </div> : <div/>
           }

           {
               view === 'Late' ? 

               <div>
                   {tasksLate.length < 1 ? <h1>No Overdue Tasks!</h1> : <h1>Tasks Overdue: </h1>}
                    {tasksLate.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksLateRequest()}></Task>
                    ))}
               </div> : <div></div>
           }


           {
               view === 'Due Tommorow' ? 
               <div>
                   {tasksLate.length < 1 ? <h1>No Tasks Due Tommorow!</h1> : <h1>Tasks Due Tommorow: </h1>}
                    {tasksDueTommorow.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksDueTommorowRequest()}></Task>
                    ))}
               </div> : <div></div>
           }

           {
               view === 'Due In A Week' ? 
               <div>
                   {tasksDueWithinWeek.length < 1 ? <h1>No Tasks Due This Week!</h1> : <h1>Tasks Due This Week: </h1>}
                    {tasksDueWithinWeek.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTaskDueWithinWeek()}></Task>
                    ))}
               </div> : <div></div>
           }

           {
               view === 'Weekly Report' ?
                <div>
                    <form className="form">
                        <div>Enter a date to view tasks by week:</div>
                        <input type="date" value={weekdate} onChange={((e) => setWeekdate(e.target.value))}/>
                    </form>
                    {tasksWeeklyReport.length < 1 ? <h1>No tasks here!</h1> : <h1>Weekly Report: </h1>}
                    {tasksWeeklyReport.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksByWeekNumber(weekdate)}></Task>
                    ))}
                </div> : <div></div>
           }
          
            {/* {tasks.length < 1 ? <h1>All Tasks Completed!</h1> : 
            
            <div>
                  {tasksDueToday.length < 1 ? <h1>No Tasks Due Today!</h1> : <h1>Tasks Due Today: </h1>}
                  <div>
                    {tasksDueToday.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksDueTodayRequest()}></Task>
                    ))}
                  </div>

                  {tasksLate.length < 1 ? <h1>No Overdue Tasks!</h1> : <h1>Tasks Overdue: </h1>}
                  <div>
                    {tasksLate.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTasksLateRequest()}></Task>
                    ))}
                  </div>

                  
                  <div>
                  <h1>All Tasks: </h1>
                    {tasks.map((task) => (
                    <Task task={task} deleteTask={() => deleteTaskRequest(task.task_id)} getTasks={() => getTaskApiRequest()}></Task>
                    ))}
                 </div>
            </div>} */}
           
            
          

        </div>
    )
}

export default ToDoContainer
