let todos = JSON.parse(localStorage.getItem('todos')) || [];

const ALL_STATE = 'all';
const ACTIVE_STATE = 'active';
const COMPLETED_STATE = 'completed';
let filterState = ALL_STATE;

const addTodos = document.querySelector('#add-todos');
addTodos.addEventListener('submit', (e) => {
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
            done: false
        });

        localStorage.setItem('todos', JSON.stringify(todos));

        inputText.value = '';
    }
    updateItemsLeft();
}

const renderTodoList = () => {
    switch (filterState) {
        case ACTIVE_STATE:
            filteredTodos = todos.filter((todo) => !todo.done);
            break;
        case COMPLETED_STATE:
            filteredTodos = todos.filter((todo) => todo.done);
            break;
        default:
            filteredTodos = todos;
    }

    const todoList = document.querySelector('#todo-list');
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
        });

        const deleteBtn = newTodo.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation;
            const todoToDelete = e.target.parentElement;
            const indexToDelete = todos.findIndex((todo) => todo.id == todoToDelete.dataset.id);
            todos.splice(indexToDelete, 1);
            todoToDelete.remove();
            localStorage.setItem('todos', JSON.stringify(todos));
            updateItemsLeft();
        });
    }
}

renderTodoList();

const filterAll = document.querySelectorAll('.filter-all');
const filterActive = document.querySelectorAll('.filter-active');
const filterComplete = document.querySelectorAll('.filter-complete');
const clearComplete = document.querySelector('#clear-complete');

filterAll.forEach((filter) => {
    filter.addEventListener('click', () => {
        filterState = ALL_STATE;
        renderTodoList();
    });
});

filterActive.forEach((filter) => {
    filter.addEventListener('click', () => {
        filterState = ACTIVE_STATE;
        renderTodoList();
    });
});

filterComplete.forEach((filter) => {
    filter.addEventListener('click', () => {
        filterState = COMPLETED_STATE;
        renderTodoList();
    });
});

clearComplete.addEventListener('click', () => {
    todos = todos.filter((todo) => !todo.done);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
});

const updateItemsLeft = () => {
    const itemsLeft = document.querySelector('#items-left');
    itemsLeft.innerText = todos.filter((todo) => !todo.done).length;
}

const modeToggle = document.querySelectorAll('.h1-mode-toggle');

modeToggle.forEach((modeBtn) => {
    modeBtn.addEventListener('click', () => {
        toggleModes();
    });
});

const toggleModes = () => {
    const body = document.querySelector('body');
    const darkMode = document.querySelector('#h1-dark-icon');
    const lightMode = document.querySelector('#h1-light-icon');

    body.classList.toggle('dark-mode');
    darkMode.classList.toggle('hidden');
    lightMode.classList.toggle('hidden');
}