const router = require('express').Router();
// helper files
const mint = require("./mint.js")

// instantiate mint apis endpoint
router.use('/mint', mint);

module.exports = router;
