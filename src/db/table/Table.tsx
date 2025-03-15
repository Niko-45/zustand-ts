import { useState } from 'react';
import useTodoStore from './jotai';
import './app2.css'; 

const App2 = () => {
  const { todos, addTodo, toggleTodo, deleteTodo,  editTodo } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);  
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      editTodo(editingId, editingTitle, editingDescription);
    } else {
      addTodo(title, description);
    }
    setTitle('');
    setDescription('');
    setEditingId(null); 
    setModal(false);
  };

  const handleEdit = (todo:any) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setEditingDescription(todo.description);
    setModal(true);  
  };

  return (
    <div className="container">
      <h1 className="header">Todo App</h1>
      <button className='add' onClick={() => setModal(!modal)} >{editingId ? 'Edit' : 'Add'}</button>
      
      {modal && (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Title"
            value={editingId ? editingTitle : title}
            onChange={(e) => (editingId ? setEditingTitle(e.target.value) : setTitle(e.target.value))}
            className="input"
          />
          <textarea
            placeholder="Description"
            value={editingId ? editingDescription : description}
            onChange={(e) => (editingId ? setEditingDescription(e.target.value) : setDescription(e.target.value))}
            className="textarea"
          />
          <button type="submit" className="button">
            {editingId ? 'Save Changes' : 'Add Todo'}
          </button>
        </form>
      )}

      <div className="todos-list">
        <ul className="todos">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox"
                />
                <div>
                  <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </h3>
                  <p className="todo-description">{todo.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleEdit(todo)} // Функсияи таҳрир
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App2;
