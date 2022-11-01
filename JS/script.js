{
   let tasks = [];

   let hideDoneTasks = false;

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
        ];
        render();
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
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        }); 
    };
    
    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class=
                "tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-tasks">
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

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="buttons__section js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__section js-markAllDone"
        ${tasks.every((task) => task.done) ? " disabled" : ""}>
        Ukończ wszystkie</button>`;
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task, done: true }));
            render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };
    
    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", markAllDone);
      };

      const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

      if (toggleHideDoneTasksButton) {
        toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      };
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

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

        const from = document.querySelector(".js-form");
        from.addEventListener("submit", onFormSubmint);
    };

    init();
}
 

    


