const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

app.use(express.json());

// Function to execute C program and return output
const runCProgram = (command, res) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`Stderr: ${stderr}`);
            return;
        }
        res.send(stdout);
    });
};

// API to test Linked List
app.get('/linkedlist', (req, res) => {
    runCProgram('./a.out', res);
});

// API to test Stack
app.get('/stack', (req, res) => {
    runCProgram('./a.out', res);
});

// API to test Queue
app.get('/queue', (req, res) => {
    runCProgram('./a.out', res);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
