
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOp = document.getElementById("filter");



//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

function addTodo(event){
  
    event.preventDefault();

    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo =document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText=todoInput.value;

    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //create completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to ul

    todoList.appendChild(todoDiv);


    //clear input value
    todoInput.value="";
}

function deleteCheck(e){
    
    const item = e.target;

    //delete 
    if(item.classList[0]=="trash-btn"){
        const parentElm = item.parentElement;
        parentElm.classList.add("fall");
        removeLocalTodos(parentElm);
        parentElm.addEventListener("transitionend",function(){
            parentElm.remove();
        });
        
    }

    //check
    if(item.classList[0]=="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo){
    //check duplicate

    let todos;
    if(localStorage.getItem('todos') === null){

        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){
    
let todos;
if(localStorage.getItem('todos') === null){

    todos=[];
}
else{
    todos = JSON.parse(localStorage.getItem('todos'));

}

todos.forEach((todo)=>{
//create div
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');

//create li
const newTodo =document.createElement('li');

newTodo.innerText=todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);


//create completed button
const completedButton = document.createElement('button');
completedButton.innerHTML='<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//create delete button
const trashButton = document.createElement('button');
trashButton.innerHTML='<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//append to ul

todoList.appendChild(todoDiv);

});
}

function removeLocalTodos(todo){
    let todos;
if(localStorage.getItem('todos') === null){

    todos=[];
}
else{
    todos = JSON.parse(localStorage.getItem('todos'));

}
const todoIndex=todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem('todos',JSON.stringify(todos));

}