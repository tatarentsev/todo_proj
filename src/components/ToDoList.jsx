import { useState } from 'react';
import '../styles/ToDoList.css';
import '@fontsource/roboto/400.css';
import DeleteIcon from '@mui/icons-material/Delete';
 
export default function ToDoList() {
    const [tasks, setTasks] = useState([
        { id: 1, task: 'Go to GYM' },
        { id: 2, task: 'Go to eat' },
        { id: 3, task: 'Travel to Moscow' }
    ]);

    const [count, setCount] = useState(tasks.length);

    function addNewTask() {
        const inputValue = document.querySelector('.input_task').value;
        if (inputValue) {
            setCount(count + 1);
            setTasks(() => [...tasks, { id: count, task: inputValue }]);
            document.querySelector('.input_task').value = null;
        }  
    }

    const enterKey = (e) => { if (e.code === 'Enter') addNewTask() };

    const isChecked = (e) => {
        const target = e.target;
        const isCheck = document.querySelectorAll('input[type="radio"]:checked');
        const isNotCheck = document.querySelectorAll('input[type="radio"]');
        const buttonBox = document.querySelector('.buttons').children;

        if (!isNotCheck.checked) {
            isNotCheck.forEach(element => {
                element.parentElement.style.display = 'flex';
            });
        }

        if (isCheck) {
            isCheck.forEach(element => {
                element.parentElement.style.display = 'none';
            });
        }

        setCount(isNotCheck.length - isCheck.length);

        for (let index = 0; index < buttonBox.length; index++) {
            const element = buttonBox[index];
            element.style.border = '0';
        }

        target.style.border = '1px solid black';
    }

    const isNotChecked = (e) => {
        const isCheck = document.querySelectorAll('input[type="radio"]');
        const isNotCheck = document.querySelectorAll('input[type="radio"]:checked');        
        const target = e.target;
        const buttonBox = document.querySelector('.buttons').children;
        const lengthNotCheck = isNotCheck.length;

        if (isCheck) {
            isCheck.forEach(element => {
                element.parentElement.style.display = 'none';
                setCount(count - 1);
            });
        }

        if (isNotCheck) {
            isNotCheck.forEach(element => {
                element.parentElement.style.display = 'flex';
            });
        }

        for (let index = 0; index < buttonBox.length; index++) {
            const element = buttonBox[index];
            element.style.border = '0';
        }

        target.style.border = '1px solid black';

        setCount(lengthNotCheck);
    }

    const allBtn = (e) => {
        setCount(tasks.length)
        const target = e.target;
        const isCheck = document.querySelectorAll('input[type="radio"]');
    
        const buttonBox = document.querySelector('.buttons').children;

        for (let index = 0; index < buttonBox.length; index++) {
            const element = buttonBox[index];
            element.style.border = '0';
        }

        target.style.border = '1px solid black';
        
        if (isCheck) {
            isCheck.forEach(element => {
                element.parentElement.style.display = 'flex';
            });
        }
    }

    return (
        <div>
            <ul className='list'>
                <div className='list_input'>
                    <input 
                    onKeyUp={enterKey}
                    type="text" 
                    placeholder='What do you want to do?' 
                    className='input_task' />
                    <button onClick={addNewTask} className='list_input_button'>↓</button>
                </div>
                
                {tasks.map((task) => (
                    <div style={{display: 'flex', backgroundColor: 'whitesmoke'}}>
                        <input 
                        className='radio_buttons' type="radio" id={task.id} value={task.task} />
                        <label for={task.id}>
                            <li className='task' key={task.id}>{task.task}</li>
                        </label> 
                        <DeleteIcon 
                        onClick={() => setTasks(tasks.filter(item => item.id !== task.id))}
                        className='task_delete' />
                    </div>
                ))}
                <div className='task_footer'>
                    <p className='task_footer_items'>{count} items left</p>

                    <div className="buttons">
                        <button onClick={allBtn} className='task_footer_buttons'>All</button>
                        <button onClick={isChecked} className='task_footer_buttons'>Active</button>
                        <button onClick={isNotChecked} className='task_footer_buttons'>Completed</button>
                    </div>
                </div>
            </ul>
        </div>
    );
}

