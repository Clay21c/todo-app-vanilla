import { Todo } from '../todos/models/todo-model';
const Filters = {
  All: 'all',
  completed: 'Completed',
  Pending: 'Pending',
};

const state = {
  todos: [new Todo('Piedra del alman')],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log('Init Store');
};

const loadStore = () => {
  throw new Error('Not implemented');
};
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};
const addTodo = (description) => {
  if (!description) throw new Error('Description is required.');
  state.todos.push(new Todo(description));
};
const toggleTodo = (todoId) => {
  throw new Error('Not implemented');
};
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};
const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
};
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
};
const getCurrentFilter = () => {
  return state.filter;
};
export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  getTodos,
};
