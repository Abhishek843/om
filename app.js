const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
// Use bodyParser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route for displaying a form to add a product
app.use('/admin',shopRoutes);
app.use(adminRoutes);


// Default route
app.use((req,res,next)=>{
  res.status(404).send('<h1>Page not found</h1>')
})

// Start the server
app.listen(3003, () => {
  console.log('Server is running on port 3000');
});
