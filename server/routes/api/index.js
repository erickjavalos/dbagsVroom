const router = require('express').Router();
// // helper files
const api = require("./api.js")

// // instantiate mint apis endpoint
router.use('/',api)

module.exports = router;
