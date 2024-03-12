const express = require('express')
PORT = 8888
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const logger = require('morgan')
const MongoStore = require('connect-mongo') (session)
const connectDB = require('./config/database')
const cors = require('cors')

require('./config/passport')(passport)


app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static('public'));
app.use(logger('dev'))



app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
)






connectDB().then(() => {
    //Server Running
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on ${process.env.PORT}, you better catch it!`
      );
    });
  });


