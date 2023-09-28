const express=require('express');
const route=express.Router();

route.get('/add-product', (req, res, next) => {
    res.send('<form action="admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
  });
  
  // Route for handling the form submission and printing the request body
route.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
  });
module.exports=route;