const dataModel = require("../models/dataModel");
module.exports = async (req, res, next) => {
  try {
    const userId = req.body.userId;

if (!userId) {
    console.log("Authentication failed - userId not provided in the request");
    return res.status(401).send({
        success: false,
        message: "Auth Failed - userId not provided",
    });
}

const user = await dataModel.findById(userId);

console.log("User:", user); 
    // const userId = req.body.userId; 
    // const user = await dataModel.findById(req.body.userId);
    // console.log("User:", user); 
    //check admin
    if (user?.role !== "admin") {
        console.log("Authentication failed - User is not an admin");
      return res.status(401).send({
        success: false,
        message: "Auth Fialed",
      });
    } else {
        console.log("Authentication successful - User is an admin");
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};