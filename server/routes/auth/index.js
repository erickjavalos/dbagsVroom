const router = require('express').Router();
// // helper files
const auth = require("./auth.js")

// // instantiate mint apis endpoint
router.use('/',auth)

module.exports = router;
