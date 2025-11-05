import { useState } from 'react';
import './App.scss';
import { TodoForm } from './components/TodoForm';
import serverTodos from './api/todos';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';
import { getUser } from './utils/getUser';
import { User } from './types/User';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

function getPreparedTodos(todos: Omit<ToDo, 'user'>[]): ToDo[] {
  return todos.map(todo => ({
    ...todo,
    user: getUser(todo.userId) as User,
  }));
}

export const App = () => {
  const [todos, setTodos] = useState(getPreparedTodos(serverTodos));

  const handleAddTodo = (todo: ToDo) => {
    setTodos(curTodos => {
      const id = Math.max(...curTodos.map(item => item.id)) + 1;

      return [
        ...curTodos,
        {
          ...todo,
          id,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
