const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/', function(req, res) {
    res.send('Get request');
});

app.post('/', function(req, res) {
    res.send('Post request');
});

app.put('/', function(req, res) {
    res.send('Put request');
});

app.delete('/', function(req, res) {
    res.send('Delete request');
});
