// import libraries
const path = require('path')
const router = require('express').Router();
// import helper files
const apiRoutes =  require("./api")

// API routes
router.use('/api', apiRoutes);

// export router
module.exports = router;
