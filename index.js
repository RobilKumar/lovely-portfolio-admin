const express = require("express");
require("dotenv").config();
const clc = require("cli-color");
const cors = require("cors");
// const multer = require('multer');
// const path = require("path");

// file imports
const PORT = process.env.PORT;
require("./db");
const Authrouter = require("./Controller/AuthController");
const AdminRouter = require("./Routes/Admin");

// constant
const app = express();

app.use(cors());




// Configure Multer to use a folder named 'uploads' to store uploaded files
//const upload = multer({ dest: 'uploads/' });


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, ".uploads"), // cb -> callback
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });


// // Configure storage engine instead of dest object.
// const upload = multer({ storage: storage })

// middleware
app.use(express.json()); // to read json
app.use('/uploads', express.static('uploads'));

//authrouter
// here those req come with auth
// will be redirected to Authrouter controller
app.use("/auth", Authrouter);
app.use("/admin", AdminRouter);

app.listen(PORT, () => {
  console.log(
    clc.yellowBright.underline(`Blogging server is running PORT:${PORT}`)
  );
});
