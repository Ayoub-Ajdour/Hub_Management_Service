const express = require("express");
const hubController = require("../controllers/hubController");

const router = express.Router();

router.get("/", hubController.getAllHubs);
router.get("/:id", hubController.getHubById);
router.get("/name/:name", hubController.getHubByName);
router.post("/", hubController.createHub);
router.delete("/:id", hubController.deleteHub);

module.exports = router;
