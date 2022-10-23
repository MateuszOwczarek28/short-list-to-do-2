{
   let tasks = [];

   let hideDoneTasks = false;

    const welcome = () => {
        console.log("Witaj!");
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {content: newTaskContent, done: false}];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)];
        render();
    }; 

    const toggleTaskDone = (taskIndex) => { 
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };
    const toggleAllDoneTask = (task) => {
        taska = tasks.map((task) => ({
            ...tasks,done: true }));
            render()
    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render()
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
         toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click",() => {
                toggleTaskDone(taskIndex);
            });
        }); 
    };
    
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class=
                "tasks__item${task.done && hideDoneTasks ? "tasks__item--hiden" : ""} js-task">
                    <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="tasks__button tasks__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString; //inne niż w you code 6:37
        bindEvents();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="buttons__sectionTwo js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__sectionTwo js-markAllDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
    };
    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", markAllTasksDone);
      }
     }
    // działa tylko nie widać przycisków css// 9.30
    
    const onFormSubmint = (event) =>{
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };
    
    const init = () => {
        render();
        welcome();

        const from = document.querySelector(".js-form");
        from.addEventListener("submit", onFormSubmint);
    };

    init();

}
 

    


