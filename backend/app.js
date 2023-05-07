const express = require("express");
const app = express();
const blogRouter = require("./routes/BlogRoutes");
const cors = require("cors");

//mongodb
const mongoose = require("mongoose");
//configure mongoose
mongoose
  .connect(
    "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"));

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogRouter);

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
