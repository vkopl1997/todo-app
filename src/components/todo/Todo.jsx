import React, { useEffect, useState } from 'react';
import './todoStyles.css';

const getTodosFromLocalStorage = () =>{
  const data = localStorage.getItem('Todos');
  if(data){
    return JSON.parse(data)
  }else{
    return []
  }
}

export const Todo = () => {

  const [todoValue,setTodoValue] = useState('');

  const [todos,setTodos] = useState(getTodosFromLocalStorage);
  
  const handleSubmit = (e) =>{
    e.preventDefault();

    const date = new Date();
    const time = date.getTime();

    let todoObj = {
      ID: time,
      TodoValue: todoValue,
      Completed: false,
    }

    setTodos([...todos,todoObj]);
    setTodoValue('');
  }
  useEffect(()=>{
    localStorage.setItem('Todos',JSON.stringify(todos));

  },[todos]);

  const handleDelete = (id) =>{
    const filtered = todos.filter((todo)=>{
      return todo.ID !== id
    })
    setTodos(filtered);
  };

  const [editForm,setEditForm] = useState(false);

  const [id,setId] = useState()

  const handleEdit = (todo,index) =>{
    setEditForm(true);
    setId(index);
    setTodoValue(todo.todoValue)
  }

  const handleEditSubmit=(e)=>{
    e.preventDefault();
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setTodoValue('');
    setEditForm(false);
  }

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.ID === id) {
        todo.Completed = !todo.Completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className='todo-main'>
        <div className='content-box'>
          <div className='todo-title'>Add Your Daily Tasks</div>
          {editForm === false &&(
            <form autoComplete='off' onSubmit={handleSubmit}>
              <div className='input-main'>
                <input type='text'  placeholder='my task' required
                onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                <button type='submit'>add</button>
              </div>
            </form>
          )}

          {editForm === true &&(
            <form autoComplete='off' onSubmit={handleEditSubmit}>
              <div className='input-main'>
                <input type='text'  placeholder='my task' required
                onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                <button type='submit'>update</button>
              </div>
            </form>   
          )}
          
          {todos.length>0 && (
            <>
              {todos.map((individualTodo,index)=>(
                <div className='todo' key={individualTodo.ID} style={individualTodo.Completed=== true?{opacity:'0.15'}:{opacity:'1'}}>
                  <div className='individualTodo'  >
                    <span>{individualTodo.TodoValue}</span>
                  </div>
                  <div className='edit-delete'>
                    {editForm === false && (
                      <div className='complete' onClick={()=>completeTodo(individualTodo.ID)}></div>
                    )}
                    
                      {editForm === false && (
                        <div className='edit' onClick={()=>handleEdit(individualTodo,index)}></div>  
                      )
                    }
                    {editForm === false && (
                      <div className='delete' onClick={()=>handleDelete(individualTodo.ID)}></div>                      )
                    }    
                  </div>
                </div>
              ))}
            </>
          )}
          {todos.length>1 && editForm === false && (
            <div className='delete-button-wrapper'>
            <button className='delete-all' onClick={()=>setTodos([])}>DELETE ALL</button>
          </div>
          )}
        </div>
    </div>
  )
}
