import React, {useEffect, useState} from "react"
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import './TodoStyles.css'

const Todo = () => {
    const API = 'https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5'; 

    const [allTodos, setAllTodos] = useState([]); 
    const [input, setInput] = useState('');


    useEffect(() => {
        getAllTodos();
    }, []);

    const getAllTodos = async () => {
        const { data } = await axios.get(API);
        setAllTodos(data);
    };

    // add tasks 
    const addNewTask = (e) => {
        e.preventDefault()
        const newTask = {
            id: new Date(),
            title: input,
            completed: false,
        }

        setAllTodos([...allTodos, newTask]);
        setInput('');
    }
    

    const handleInput = ({ target }) => {
        const valueInput = target.value; 
        setInput(valueInput);
    }; 

    // delete tasks 
    const deleteTask = (id) => {
        let filteredTodos = allTodos.filter((todo) => todo.id !== id);
        setAllTodos(filteredTodos); 
    };

    // toggle completed tasks
   const completedTask = (index) => {
        const updatedTodos = [...allTodos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setAllTodos(updatedTodos)
    } 

    return (
     <div className="todoContainer">
        
        <form onSubmit={addNewTask}>
            <div className="todoInput">
                <input 
                    className="inputInner"
                    value={input}
                    onChange={handleInput} 
                    placeholder='Enter the text'
                    type='text'
                />
                <AiOutlinePlus className="inputIcon" onClick={addNewTask} /> {/* AiOutlinePlus icon */}
            </div> {/* todoInput */}
        </form>        
           

        <div>
            {allTodos.map((todo, index) => {
                return (
                    <div className='todoItem' key={todo.id}>
                        <div className="todoItemRight">
                            <input onChange={() => completedTask(index)} type="checkbox" />
                            <div className={todo.completed ? 'completed' : ''}>{index + 1}. {todo.title}</div>
                        </div> 
                        <AiOutlineClose className="deleteIcon" onClick={() => deleteTask(todo.id)}/>   
                    </div> 
                )
            })}
        </div> { /*  allTodos  */}

     </div> /* todoContainer */
  )
}

export default Todo