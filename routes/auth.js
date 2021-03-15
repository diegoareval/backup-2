const router = require("express").Router();
const controller = require("../controllers/auth.controller")

router.post('/connect', controller.connect()
);

module.exports = router;