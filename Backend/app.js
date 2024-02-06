const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.use('/user', userRouter);

app.listen(8000, () => {
    console.log("The Port is listening on port 8000");
});