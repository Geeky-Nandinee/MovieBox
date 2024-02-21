const express = require("express");
require('./db')
const userRouter = require("./routes/user");

const app = express();
app.use(express.json())
app.use("/api/user", userRouter);

// app.get("/about", 
// (req, res, next) => {
//   next();
// },
// (req, res) => {
//   res.send("<h1>Hello I am from your backend Page</h1>");
// });

app.post("/sign-in", 
(req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password)
    return res.json({error: "email/password missing!"});
  next();
},
(req, res) => {
  res.send("<h1>Hello I am from your backend Page</h1>");
});


app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});




//() => {}  --  This function is a middelware function for loading the site
