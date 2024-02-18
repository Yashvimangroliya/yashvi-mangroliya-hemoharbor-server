const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController } = require("../controllers/inventoryControllers");

const router = express.Router()

//Add inventory

router.post("/create-inventory", authMiddleware, createInventoryController);

// Get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController)

module.exports = router;