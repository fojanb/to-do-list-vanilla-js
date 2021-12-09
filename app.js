const shopping = document.querySelector(".shopping");
const form = document.querySelector("#form");
const taskList = document.querySelector(".taskList");
const shoppingCart = document.querySelector(".shoppingCart");
let toDoList = []; //This array holds our state
function fetchTasks() {
  let currentTasks = JSON.parse(localStorage.getItem("myTasks"));
  if (!currentTasks) {
    return;
  }
  toDoList.push(...currentTasks);
  displayTask();
}
function displayTask() {
  // First approach :
  // const list = document.createElement("li");
  // list.innerText = newTask;
  // taskList.appendChild(list);
  // Second approach :
  let newTask = toDoList
    .map(
      (task) =>
        `<li>
            <div>
                <input type="checkbox" id=${task.id}/>
                <span>${task.title}</span>
            </div>
            <button type="submit" id=${task.id} aria-label="Delete Button" class="deleteBtn">\u00D7</button>
        </li>`
    )
    .join("");
  taskList.innerHTML = newTask;
  shopping.appendChild(taskList);
}
function saveTasks() {
  // Remember that server only understand strings:
  localStorage.setItem("myTasks", JSON.stringify(toDoList));
}
function submitHandler(e) {
  // Remember that e.currentTarget is our form
  e.preventDefault();
  const task = {
    title: e.currentTarget.task.value,
    id: Date.now(),
    isDone: false,
  };
  toDoList.push(task);
  e.currentTarget.task.value = "";
  saveTasks();
  displayTask();
}
function displayTaskHistory() {
  // if (toDoList.length == 0) {
  //   alert("Your tasks history is empty");
  //   return;
  // }
  fetchTasks();
}
function deleteTask(e) {
  // "Delegation" is happening here.5
  if (e.target.matches("button")) {
    let target = toDoList.findIndex((task) => task.id == e.target.id);
    toDoList.splice(target, 1);
    saveTasks();
    displayTask();
  }
}
form.addEventListener("submit", submitHandler);
shoppingCart.addEventListener("click", displayTaskHistory);
taskList.addEventListener("click", deleteTask);
