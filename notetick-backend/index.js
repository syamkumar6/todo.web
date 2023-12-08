
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");
const cookieParses = require("cookie-parser");

const UserRouter = require("./Routes/UserRouter")
const TodoRouter = require("./Routes/TodoRouter")

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParses());
app.use(express.json());
app.use(
    cors({
      origin: ["https://notetick-t-cli-syam-kumars-projects.vercel.app/"],
      methods: ["POST, GET, DELETE"],
      credentials: true,
    })
  );
app.use((req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP Address:', ipAddress);
  next();
});

app.use("/users", UserRouter)
app.use("/todos", TodoRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main().then(() => console.log("db connected")).catch(err => console.log(err));

async function main() {
    const db_url = process.env.DB_URL 
    const urlWithPassword = db_url.replace("<password>", process.env.DB_PASSWORD)
  await mongoose.connect(urlWithPassword);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}