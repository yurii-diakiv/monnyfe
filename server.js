const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/MonnyFe'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/MonnyFe/'}),
);
app.listen(process.env.PORT || 8080);