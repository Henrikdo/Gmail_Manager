const router = require("express").Router();


const imageRouter = require('./images')

router.use("/",imageRouter);

module.exports = router;