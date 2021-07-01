const express = require('express');
const userRouter = require('./routes/user.routes.js');

const app = express();

const http = require('http');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use('/api', userRouter);


const httpServer = http.createServer(app);

httpServer.listen(8000, () => {
	console.log('Server is listening on port 8000');
});

app.get('/', express.static(path.join(__dirname, './public')));
