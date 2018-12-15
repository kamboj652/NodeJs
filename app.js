const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://node-shop:'
+process.env.MONGO_ATLAS_PWD+
'@node-rest-shop-cfql8.mongodb.net/test?retryWrites=true',{
  useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS access
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requestd-With, Content-Type, Accept, Autorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//any error that occurs with the request
app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//handle every kind of handle like DB, etc...
app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.json({
      error:{
        message:error.message
      }
  });
});

module.exports = app;
