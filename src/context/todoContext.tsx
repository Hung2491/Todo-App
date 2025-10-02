import { createContext, useContext, useState, useEffect, type ReactNode,  } from "react";

export interface Todo {
  id: number;
  title: string;
  comment: string;
  tag: string;
  date: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  getTodosByDate: (date: string) => Todo[];
  countByTag: (tag: string) => number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load from localStorage on init
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, "id">) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (id: number, updatedFields: Partial<Todo>) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const getTodosByDate = (date: string) => {
    return todos.filter((todo) => {
      const parts = todo.date.split(" - ");
      const todoDate = parts.length > 1 ? parts[1] : todo.date;
      return todoDate === date;
    });
  };

  const countByTag = (tag: string) => {
    return todos.filter((t) => t.tag === tag).length;
  };

  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    getTodosByDate,
    countByTag,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const UseTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};