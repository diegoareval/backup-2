const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.get("/connect", controller.connect());

router.get("/oauth/callback", controller.callback());

router.get("/me", controller.me());

module.exports = router;
