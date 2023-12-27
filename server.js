const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require("./models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// parse request of content type application/json
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application!" })
});

// including tutorial routes
require("./routes/turorial.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})