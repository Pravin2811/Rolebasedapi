const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");


const { DB, PORT } = require("./config");


const app = exp();
require('dotenv').config()

app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);


app.use("/api/users", require("./routes/users"));

const startApp = async () => {
  try {
    await connect(DB, {
      dbName: process.env.DB_NAME,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n`
    });

    
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}` })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`
    });
    startApp();
  }
};

startApp();
