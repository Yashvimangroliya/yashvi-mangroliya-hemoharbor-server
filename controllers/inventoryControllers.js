const dataModel = require("../models/dataModel");
const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await dataModel.findOne({ email });
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
    await inventory.save()
    return res.status(201).send({
        success:true,
        message:"New Blood Record Added"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

module.exports = { createInventoryController };
