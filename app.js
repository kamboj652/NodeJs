const express = require('express');
const app = express();
const morgan = require('morgan');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));


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
