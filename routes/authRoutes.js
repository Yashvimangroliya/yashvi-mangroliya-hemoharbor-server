const express =require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()
//Register
router.post("/register",registerController);
//Login 
router.post("/login", loginController);
//GET Current user
router.get("/current-user", authMiddleware, currentUserController)

module.exports = router;

