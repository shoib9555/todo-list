// selecting DOM input
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try to load saved todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function savetodos() {
    // save current todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Create a DOM node for a todo object and append it to the list
function createToDoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to tongle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';

        // ToDo Visual feedback: Strike trough line when completed
        savedTodos();
    });
    // text of to do
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    //add double click event litsener to edit to do
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            savedTodos();
        }
    });
    // delete to do button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    //ReCreate each item
    todos.forEach((todo, index) => {
        const node = createToDoNode(todo, index);
        list.appendChild(node)
    });
}
function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    // Push a new todo object
    todos.push({ text: text, completed: false });
    input.value = '';
    render()
    savedTodos()
}

addBtn.addEventListener("click", addTodo);
render();
