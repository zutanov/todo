const title = document.querySelector('.todo__title')
const priority = document.querySelector('.todo__priority')
const me = document.querySelector('#me')
const create = document.querySelector('.todo__btn')
const todo = document.querySelector('.todos')

const newTask = {
    description: "",
    priority: 1,
    isMe: true,
    id: 0
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || []


title.addEventListener('input', (e) => {
    newTask.description = e.target.value
})
priority.addEventListener('input', (e) => {
    newTask.priority = +e.target.value
})

create.addEventListener('click', () => {
    newTask.isMe = me.checked
    createTask(newTask)
    showTask()
    console.log(tasks)
})


const createTask = (task) => {
    let id
    if (tasks.length > 0) {
        num = tasks[tasks.length - 1].id
        id = num + 1
    } else {
        id = 0
    }

    if (newTask.description) {
        const newT = {
            description: task.description,
            priority: task.priority,
            isMe: task.isMe,
            id: id
        }
        tasks = tasks.concat(newT)
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }
}

const showTask = () => {

    const choiceWriter = el => el.isMe ? 'Me' : 'Others'

    const priorityWriter = (el) => {
        switch (el.priority) {
            case 1:
                return " <p style='background: green' class=\"task__priority\">" + el.priority + "</p>"
            case 2:
                return " <p style='background: orange' class=\"task__priority\">" + el.priority + "</p>"
            case 3:
                return " <p style='background: red' class=\"task__priority\">" + el.priority + "</p>"
        }
    }
    
    todo.innerHTML = tasks.map((el) => {
        return '  <div class=\"task\">' +
            '   <div class=\"task__info\"> ' +
            '      <h2 class=\"task__desc\">' + el.description + '</h2>' +
            '    <p class=\"task__person\">' + choiceWriter(el) + '</p> ' +
            priorityWriter(el) +
            '  </div> ' +
            '  <button id=' + el.id + ' class=\"task__delete\">Delete</button> ' +
            ' </div> '

    }).join('')
    
    const buttons = Array.from(document.querySelectorAll('.task__delete'))
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnForDelete = +e.target.id
            console.log(tasks.id)
            tasks = tasks.filter((el) => {
                if (el.id !== btnForDelete) {
                    return el
                }
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
            showTask()
        })
    })
}
showTask()


