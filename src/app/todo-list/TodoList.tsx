'use client';
import React, { useState } from 'react';

export default function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleSubmit = () => {
    setTodoList([...todoList, todo]);
    setTodo('');
  };

  const handleDelete = (index: number) => {
    console.log(index);
    //create a new array and filter out the deleted todo
    const newTodoList = todoList.filter(
      (todo: string, i: number) => i !== index
    );
    setTodoList(newTodoList);
  };
  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <div>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type='text'
            placeholder='Add your task'
          />
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <ul>
          {todoList.map((todo, index) => {
            return (
              <li key={index}>
                <span>{todo}</span>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
