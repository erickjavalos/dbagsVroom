// import libraries
const path = require('path')
const router = require('express').Router();
// import helper files
const apiRoutes =  require("./auth")

// // API routes
router.use('/auth', apiRoutes);

// // export router
module.exports = router;
