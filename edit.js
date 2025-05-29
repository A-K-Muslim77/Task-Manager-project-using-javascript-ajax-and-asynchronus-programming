

const taskId = new URLSearchParams(window.location.search).get("task");

const taskForm = document.getElementById("edit-task-form")
const taskInputTitle = document.getElementById("task-title")
const goBackButton = document.getElementById("go-back-btn")



const API_URL = "https://6836dbee664e72d28e426de7.mockapi.io/tasks";

fetch(`${API_URL}/${taskId}`)
    .then((res) => res.json())
    .then((task) =>{
        taskInputTitle.value = task.title;
    })
    .catch( () => alert("Something went wrong."));


    
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updateTaskTitle = taskInputTitle.value;
    if(updateTaskTitle){
        fetch(`${API_URL}/${taskId}`, {
            method: "PUT",
            body: JSON.stringify({title: updateTaskTitle , completed: false }),
            headers: {"Content-Type" : "Application/json "}
        })
           .then((res) =>res.json())
           .then(()=>{
             alert("Task Updated Successfully!!!")
             window.location.href = "index.html";
        }).catch(()=> alert("Something went wrong."))
    }else {
        alert("No Task Found-")
    }
})

goBackButton.addEventListener("click", () => {
        window.history.back();
});
