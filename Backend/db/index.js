const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('db is connected!')
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/review_app')
// .then(() =>{
//     console.log('db is connected!')
// })
// .catch((ex) =>{
//     console.log('db connection failed: ', ex)
// })
