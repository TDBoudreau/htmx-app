const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json

const utils = require('./helpers/utils.js')
const TABS = require('./data/tabContent.js')

let contact = {
  firstName: 'Joe',
  lastName: 'Blow',
  email: 'joe@blow.com'
};

app.get('/contact/:id', (req, res) => {
  res.send(`
    <div hx-target="this" hx-swap="outerHTML">
      <div><label>First Name</label>: ${contact.firstName}</div>
      <div><label>Last Name</label>: ${contact.lastName}</div>
      <div><label>Email</label>: ${contact.email}</div>
      <button hx-get="/contact/${req.params.id}/edit" class="btn primary">Click To Edit</button>
    </div>
  `);
});

app.get('/contact/:id/edit', (req, res) => {
  res.send(`
    <form hx-put="/contact/${req.params.id}" hx-target="this" hx-swap="outerHTML">
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value="${contact.firstName}">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value="${contact.lastName}">
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" name="email" value="${contact.email}">
      </div>
      <button type="submit" class="btn">Submit</button>
      <button type="button" class="btn" hx-get="/contact/${req.params.id}">Cancel</button>
    </form>
  `);
});

app.put('/contact/:id', (req, res) => {
  console.log(req.body);
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;

  res.send(`
    <div hx-target="this" hx-swap="outerHTML">
      <div><label>First Name</label>: ${contact.firstName}</div>
      <div><label>Last Name</label>: ${contact.lastName}</div>
      <div><label>Email</label>: ${contact.email}</div>
      <button hx-get="/contact/${req.params.id}/edit" class="btn primary">Click To Edit</button>
    </div>
  `);
});

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
  const ret = utils.elementWrapper('Content for Tab 1', 'div', '', 'tab-panel active');
  simulateDelay(res, ret);
});

app.get('/tabs/tab2', (req, res) => {
  const ret = utils.elementWrapper('Content for Tab 2', 'div', '', 'tab-panel active');
  simulateDelay(res, ret);
});

app.get('/tabs/tab3', (req, res) => {
  const ret = utils.elementWrapper('Content for Tab 3', 'div', '', 'tab-panel active');
  simulateDelay(res, ret);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});