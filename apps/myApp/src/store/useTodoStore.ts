import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text: string) => 
        set((state) => ({
          todos: [
            ...state.todos, 
            { id: Date.now(), text, completed: false }
          ]
        })),
      toggleTodo: (id: number) => 
        set((state) => ({
          todos: state.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        })),
      removeTodo: (id: number) => 
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        })),
      clearCompleted: () => 
        set((state) => ({
          todos: state.todos.filter(todo => !todo.completed)
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTodoStore; 