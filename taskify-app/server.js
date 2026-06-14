// This is the Back-End Server (The Waiter)
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT =process.env.PORT || 3000;

// Tell the server to understand JSON data (the language computers use to send tasks)
app.use(express.json());

// Tell the server where to look for your front-end file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public-index.html'));
});

// 📁 THE DATABASE PATH (Our file-based pantry)
const DATA_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from our "pantry" file
function readTasks() {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Helper function to save tasks to our "pantry" file
function saveTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// -------------------------------------------------------------
// 🛎️ SERVER RULE 1: Send all stored tasks to the front-end
// -------------------------------------------------------------
app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// -------------------------------------------------------------
// 🛎️ SERVER RULE 2: Receive a new task and validate it!
// -------------------------------------------------------------
app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const newTaskText = req.body.text;

    // 🚨 BACK-END VALIDATION (The Waiter checks the order)
    if (!newTaskText || newTaskText.trim() === "") {
        return res.status(400).json({ error: "Task cannot be empty!" });
    }

    // Create the task object
    const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false
    };

    // Add it to our list and save it to the file
    tasks.push(newTask);
    saveTasks(tasks);

    // Send the successfully saved task back to the front-end
    res.status(201).json(newTask);
});

// -------------------------------------------------------------
// 🛎️ SERVER RULE 3: Update a task (mark as completed)
// -------------------------------------------------------------
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found!" });
    }

    // Toggle or set completed status
    task.completed = req.body.completed !== undefined ? req.body.completed : !task.completed;
    saveTasks(tasks);
    res.json(task);
});

// -------------------------------------------------------------
// 🛎️ SERVER RULE 4: Delete a task
// -------------------------------------------------------------
app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found!" });
    }

    // Remove the task from the list
    const deletedTask = tasks.splice(index, 1);
    saveTasks(tasks);
    res.json(deletedTask[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running! Open http://localhost:${PORT} in your browser.`);
});