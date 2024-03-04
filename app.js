const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://cberen15:717235Cb.@wuubimedia.qfs2zro.mongodb.net/",
  {
    dbName: "uby-student-management",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/students", require("./routes/studentRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/classes", require("./routes/classRoutes"));
app.use("/instructors", require("./routes/instructorRoutes"));
app.use("/admins", require("./routes/adminRoutes"));

const options = {
  swaggerDefinition: {
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description:
        "API for managing students, attendance, classes, instructors, and admins",
    },
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
