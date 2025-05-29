const API_URL = "https://6836dbee664e72d28e426de7.mockapi.io/tasks";

const taskLists = document.getElementById("tasks");
const taskForm = document.getElementById("new-task-form")
const taskInputTitle = document.getElementById("task-title")

// Read || Get
const fetchTasks = () => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET",API_URL,true);
    xhr.onload = function (){
        // console.log(xhr);
        if(xhr.status === 200) {
            const tasks = JSON.parse(xhr.response);
            // console.log(tasks);
            renderTasks(tasks);
        }
    }
    xhr.send();
}

const renderTasks = (tasks)=>{
    taskLists.innerHTML = "";
    
    tasks.forEach(task => {
        // console.log(task);
        let li = document.createElement('li')

        li.innerHTML = `
        
        <div class = "single-task">
            <p>
                ${task.id}.${task.title}
            </p>
            

            <div>
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}" >Delete</button>
            </div>
        </div>
        
        
        `;
        taskLists.appendChild(li);
    });
    let editButtons =document.querySelectorAll(".edit-btn")
    let deleteButtons =document.querySelectorAll(".delete-btn")

    editButtons.forEach(button=>{
        button.addEventListener("click",(e)=>{
            const taskId = e.target.dataset.id;
            console.log(taskId);


            window.location.href= `edit.html?task=${taskId}`
            
        })
    })

    deleteButtons.forEach(button=>{
        button.addEventListener("click",(e)=>{
            const taskId = e.target.dataset.id;
            console.log(taskId);
            deleteTask(taskId);
            
        })
    })
}

fetchTasks();  

taskForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const taskTitle = taskInputTitle.value;
    if(taskTitle){
        addTask(taskTitle)
        taskInputTitle.value = "";
    }
    else alert("No Task Found....")
})

// CREATE || POST

const addTask = (task) => {

    const data = {
        title: task,
        completed: false,
    }

    const xhr = new XMLHttpRequest()
    xhr.open("POST",API_URL,true)
    xhr.setRequestHeader("Content-Type","Application/json ")

    xhr.onload = function(){
        if(xhr.status === 201){
            alert("Task Added Successfylly!!!!")
            fetchTasks();
        }
        
        
    }
    xhr.send(JSON.stringify(data))
}

// Delete

const deleteTask = (taskId)=>{
    const xhr = new XMLHttpRequest()
    xhr.open("DELETE",`${API_URL}/${taskId}`,true)
    xhr.onload = function (){
        if(xhr.status === 200){
            alert(`Task: ${taskId} deleted successfully...`)
            fetchTasks();
        }
        
    }
    xhr.send();
}