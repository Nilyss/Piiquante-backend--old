// Import
const express = require("express");

// Function router()
const router = express.Router();

// Import middleware authentication
const auth = require("../middleware/auth");

// Import middleware multer for image management
const multer = require("../middleware/multer-config");

// Import controllers
const sauceController = require("../controllers/sauce");
const likeController = require("../controllers/like");

// Roads
router.post("/", auth, multer, sauceController.createSauce);
router.get("/", auth, sauceController.getAllSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.put("/:id", auth, multer, sauceController.updateOneSauce);
router.delete("/:id", auth, sauceController.deleteOneSauce);
router.post("/:id/like", auth, likeController.likeSauce);

module.exports = router;
