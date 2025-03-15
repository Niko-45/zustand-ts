import { create } from 'zustand';

interface Todo {
  id: number | string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, description: string) => void;
  toggleTodo: (id: number | string) => void;
  editTodo: (id: number | string, title: string, description: string) => void;  // Функсияи edit
  deleteTodo: (id: number | string) => void;
  clearTodos: () => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {title:"title 1", description:"description 1", completed:true, id:"1"},
    {title:"title 2", description:"description 2", completed:false, id:"2"},
    {title:"title 3", description:"description 3", completed:true, id:"3"},
  ],
  addTodo: (title, description) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), title, description, completed: false },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  editTodo: (id, title, description) =>  // Илова кардани editTodo
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  clearTodos: () => set({ todos: [] }),
}));

export default useTodoStore;
