import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPendingTodos, renderTodos } from './use-cases';
const ElementIds = {
  ClearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilter: '.filtro',
  PendingCount: '#pending-count',
};
export const App = (element) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };
  const updatePendingCount = () => {
    renderPendingTodos(ElementIds.PendingCount);
  };
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(element).append(app);
    displayTodos();
  })();

  // referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUl = document.querySelector(ElementIds.TodoList);
  const clearCompletedA = document.querySelector(ElementIds.ClearCompleted);
  const filterUL = document.querySelectorAll(ElementIds.TodoFilter);
  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });
  todoListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  });
  todoListUl.addEventListener('click', (event) => {
    const isDistroy = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');
    if (!element || !isDistroy) return;

    todoStore.deleteTodo(element.getAttribute('data-id'));
    displayTodos();
  });
  clearCompletedA.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });
  filterUL.forEach((element) => {
    element.addEventListener('click', (element) => {
      filterUL.forEach((ele) => ele.classList.remove('selected'));
      element.target.classList.add('selected');
      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completados':
          todoStore.setFilter(Filters.completed);
          break;
      }
      displayTodos();
    });
  });
};
