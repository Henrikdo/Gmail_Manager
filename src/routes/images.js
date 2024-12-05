

const imageController = require("../controllers/imageUploadController");

const router = require("express").Router();



//Functions
//router.post("/colchoes",colchaoController.create);
router.route("/images").post((req ,res ) => imageController.sendMediaMessage(req, res));






module.exports = router;