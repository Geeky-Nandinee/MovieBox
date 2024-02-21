const express = require("express");
const { create } = require("../controllers/user");
const { userValidtor, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidtor, validate, create);

module.exports = router;

// const express = require('express');
// const { create } = require('../controllers/user');
// const { UserValidtor ,validate } = require('../middlewares/validator');

// const router = express.Router();


// router.get("/",(req,res) => {
//     res.send(<h1> hello I am from you backend server</h1>)
// })

// router.post('/create', userValidtor, validate,  create);
// module.exports = router;





// router.get
// sending data to our backend user
// router.post
// we will be gating some data from our frontend user
