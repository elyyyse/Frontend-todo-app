const ALL_STATE = 'all';
const ACTIVE_STATE = 'active';
const COMPLETED_STATE = 'completed';
let filterState = ALL_STATE;
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const addTodos = document.querySelector('#add-todos');
addTodos.addEventListener('submit', e => {
  e.preventDefault();
  createNewTodos();
  renderTodoList();
});

const createNewTodos = () => {
  const inputText = document.querySelector('#new-todo');

  if (inputText.value) {
    todos.push({
      copy: inputText.value,
      id: todos.length,
      done: false,
    });

    localStorage.setItem('todos', JSON.stringify(todos));

    inputText.value = '';
  }
  updateItemsLeft();
};

const todoList = document.querySelector('#todo-list');
const renderTodoList = () => {
  switch (filterState) {
    case ACTIVE_STATE:
      filteredTodos = todos.filter(todo => !todo.done);
      break;
    case COMPLETED_STATE:
      filteredTodos = todos.filter(todo => todo.done);
      break;
    default:
      filteredTodos = todos;
  }

  //   const todoList = document.querySelector('#todo-list');
  todoList.innerText = '';

  const template = document.querySelector('#todo-template');
  for (let todo of filteredTodos) {
    const newTodo = template.content.firstElementChild.cloneNode(true);

    newTodo.dataset.id = todo.id;
    newTodo.querySelector('input').id = todo.id;
    newTodo.querySelector('label').setAttribute('for', todo.id);
    newTodo.querySelector('label').innerText = todo.copy;
    if (todo.done) {
      newTodo.querySelector('input').checked = true;
    }
    todoList.appendChild(newTodo);

    newTodo.addEventListener('click', () => {
      if (newTodo.querySelector('input').checked) {
        todo.done = true;
        updateItemsLeft();
      } else {
        todo.done = false;
        updateItemsLeft();
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    });

    const deleteBtn = newTodo.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation;
      const todoToDelete = e.target.parentElement.parentElement;
      const indexToDelete = todos.findIndex(
        todo => todo.id == todoToDelete.dataset.id
      );
      todos.splice(indexToDelete, 1);
      todoToDelete.remove();
      localStorage.setItem('todos', JSON.stringify(todos));
      updateItemsLeft();
    });
  }
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });
};
renderTodoList();

const filterAll = document.querySelectorAll('.filter-all');
const filterActive = document.querySelectorAll('.filter-active');
const filterComplete = document.querySelectorAll('.filter-complete');
const clearComplete = document.querySelector('#clear-complete');

filterAll.forEach(filter => {
  filter.addEventListener('click', () => {
    filterState = ALL_STATE;
    renderTodoList();
  });
});

filterActive.forEach(filter => {
  filter.addEventListener('click', () => {
    filterState = ACTIVE_STATE;
    renderTodoList();
  });
});

filterComplete.forEach(filter => {
  filter.addEventListener('click', () => {
    filterState = COMPLETED_STATE;
    renderTodoList();
  });
});

clearComplete.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.done);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodoList();
});

const updateItemsLeft = () => {
  const itemsLeft = document.querySelector('#items-left');
  itemsLeft.innerText = todos.filter(todo => !todo.done).length;
};

const modeToggle = document.querySelectorAll('.h1-mode-toggle');

modeToggle.forEach(modeBtn => {
  modeBtn.addEventListener('click', () => {
    toggleModes();
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  });
});

const toggleModes = () => {
  const body = document.querySelector('body');
  const darkModeBtn = document.querySelector('#h1-dark-icon');
  const lightModeBtn = document.querySelector('#h1-light-icon');

  body.classList.toggle('dark-mode');
  darkModeBtn.classList.toggle('hidden');
  lightModeBtn.classList.toggle('hidden');
};
if (isDarkMode) {
  toggleModes();
}

todoList.addEventListener('dragover', e => {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (!afterElement) {
    todoList.appendChild(draggable);
  } else {
    todoList.insertBefore(draggable, afterElement);
  }
});

todoList.addEventListener('drop', e => {
  e.preventDefault();
  const updatedTodoList = [...document.querySelectorAll('.draggable')];
  updatedTodoList.forEach((updatedTodo, index) => {
    todos[index].copy = updatedTodo.querySelector('label').innerText;
    todos[index].id = updatedTodo.getAttribute('data-id');
    todos[index].done = updatedTodo.querySelector('input').checked;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
