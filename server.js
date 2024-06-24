const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const TABS = require('./data/tabContent.js')

// Server index.html at root endpoint
app.use(express.static(path.join(__dirname, 'public')));

// Simple endpoint
app.get('/api/greet', (req, res) => {
  res.send('Hello from the API!');
});

app.get('/tabs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tabs.html'))
})

// app.get('/tabs/tab1', (req, res) => {
//   res.send('<div class="tab-panel">Content for Tab 1</div>');
// });

// app.get('/tabs/tab2', (req, res) => {
//   res.send('<div class="tab-panel">Content for Tab 2</div>');
// });

// app.get('/tabs/tab3', (req, res) => {
//   res.send('<div class="tab-panel">Content for Tab 3</div>');
// });

// Simulate delay for tab content loading
const simulateDelay = (res, content) => {
  setTimeout(() => {
      res.send(content);
  }, Math.random() * 2000); // Random delay between 0 and 2 seconds
};

app.use(express.static('public'));

app.get('/tabs/tab1', (req, res) => {
  simulateDelay(res, '<div class="tab-panel">Content for Tab 1</div>');
});

app.get('/tabs/tab2', (req, res) => {
  simulateDelay(res, '<div class="tab-panel">Content for Tab 2</div>');
});

app.get('/tabs/tab3', (req, res) => {
  simulateDelay(res, '<div class="tab-panel">Content for Tab 3</div>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});