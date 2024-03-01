const express = require('express');
const router = express.Router();

const {
    update, updatePassword 
} = require('../controllers/userController');

router.put('/', update);
router.put('/update-password', updatePassword);

module.exports = router;