const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const auth = require('../services/auth');
const config = require('../config');
router.get("/connect", controller.connect());

router.get("/oauth/callback", controller.callback());



module.exports = router;
