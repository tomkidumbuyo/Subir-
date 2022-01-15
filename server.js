const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
require('dotenv').config();





// app
const app = express();

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://amplify:' + process.env.DB_PASSWORD + '@cluster0.wl8lt.mongodb.net/amplify?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        //useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// import routes
const cardRoutes = require('./routes/card');
app.use('/api', cardRoutes);


// Server static assets if in production
//if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
//}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
