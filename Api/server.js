const express = require('express')
const bodyparser = require('body-parser')
const multer = require("multer");
const cors = require('cors')

const {
  LogSignRouter,
  ProductRouter,
  OrderRouter
 } = require('./Router/main.router');


require("express-group-routes");
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());


app.group("/api/ecommerce", (router) =>{
    router.use('/User',multer().none(), LogSignRouter);
    router.use('/Product',multer().none(), ProductRouter);
    router.use('/User/Order',multer().none(), OrderRouter);
})

app.get('/', (req, res) => {
    res.send('Hello, this is your server!');
  });
  
  const port = 3006;
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

