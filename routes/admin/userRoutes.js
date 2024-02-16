const express = require('express');
const router = express.Router();

const {
    index, show, update, updatePassword
} = require('../../controllers/admin/userController');

router.get('/', index);
router.get('/:id', show);
router.put('/:id', update);
router.put('/:id', updatePassword);

module.exports = router;