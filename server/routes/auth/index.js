const router = require('express').Router();
// // helper files
const auth = require("./authentication.js")

// // instantiate mint apis endpoint
router.use('/',auth)

module.exports = router;
