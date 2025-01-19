"use strict";
alert('Hello World');
(() => {
    let NotificationsPlatform;
    (function (NotificationsPlatform) {
        NotificationsPlatform["SMS"] = "SMS";
        NotificationsPlatform["EMAIL"] = "EMAIL";
        NotificationsPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationsPlatform || (NotificationsPlatform = {}));
    let ViewMode;
    (function (ViewMode) {
        ViewMode["TODO"] = "TODO";
        ViewMode["REMINDER"] = "REMINDER";
    })(ViewMode || (ViewMode = {}));
    const UUID = () => {
        return Math.random().toString(32).substring(2, 9);
    };
    const DateUtils = {
        tomorrow() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today() {
            return new Date();
        },
        formatDate(date) {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        }
    };
    class Reminder {
        constructor(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.date = DateUtils.tomorrow();
            this.notifications = [NotificationsPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        render() {
            return `
           --> Reminder <--
           description: ${this.description}
           date: ${DateUtils.formatDate(this.date)}
           platform: ${this.notifications.join(',')}`;
        }
    }
    class TODO {
        constructor(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        render() {
            return `
                --> TODO <--
                description: ${this.description}
                done: ${this.done}`;
        }
    }
    const todo = new TODO('TODO criado com a classe');
    const reminder = new Reminder('Reminder criado com a classe', new Date(), [NotificationsPlatform.EMAIL]);
    const taskView = {
        getTodo(form) {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new TODO(todoDescription);
        },
        getReminder(form) {
            const reminderNotifications = [
                form.notifications.value,
            ];
            const reminderDate = new Date(form.reminderDate.value);
            const reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(reminderDescription, reminderDate, reminderNotifications);
        },
        render(tasks, mode) {
            const tasksList = document.getElementById('tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
            const todoSet = document.getElementById('todoSet');
            const reminderSet = document.getElementById('reminderSet');
            if (mode === ViewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display: block');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute('disabled');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('style', 'display: none');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('disabled', 'true');
            }
            else {
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute('style', 'display: block');
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.removeAttribute('disabled');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display:none');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('disabled', 'true');
            }
        },
    };
    const TaskController = (view) => {
        var _a, _b;
        const tasks = [];
        let mode = ViewMode.TODO;
        const handleEvent = (event) => {
            event.preventDefault();
            const form = event.target;
            switch (mode) {
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        const handleToggleMode = () => {
            switch (mode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document.getElementById('toggleMode')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleToggleMode);
        (_b = document
            .getElementById('taskForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
