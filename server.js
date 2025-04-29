const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/school.route");
const { SchoolModel } = require("./models/School.model");

dotenv.config();

const app = express();
const PORT =3000;

app.use(bodyParser.json());


app.use("/", schoolRoutes);


SchoolModel().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
