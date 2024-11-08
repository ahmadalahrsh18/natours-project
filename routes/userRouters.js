const express = require('express');

const userController = require('./../controllers/usercontroller');



const router = express.Router();
router
.route('/')
.get(userController.getAllUsers)
.patch(userController.CreateAllUsers);


router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;