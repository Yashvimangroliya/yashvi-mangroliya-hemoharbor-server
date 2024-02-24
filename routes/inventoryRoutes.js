const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController } = require("../controllers/inventoryControllers");

const router = express.Router()

//Add inventory

router.post("/create-inventory", authMiddleware, createInventoryController);

// Get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Get donar records
router.get("/get-donars", authMiddleware, getDonarsController);
// Get hospital records
router.get("/get-hospital", authMiddleware, getHospitalController);

module.exports = router;