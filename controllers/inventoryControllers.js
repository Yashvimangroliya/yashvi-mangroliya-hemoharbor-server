const dataModel = require("../models/dataModel");
const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    console.log("Request Body:", req.body);
    console.log("Before findOne");
    const user = await dataModel.findOne({ email });
    console.log("After findOne, User:", user);

    console.log("User:", user);
    if (!user) {
      throw new Error("user not found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("not a donar account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("not a hospital");
    }
    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

//get all blood records

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory",
      error: error.message,
    });
  }
};

module.exports = { createInventoryController, getInventoryController };
