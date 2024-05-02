const express = require('express');
const { formApp, thanks } = require('../controllers/menuController');
const router = express.Router();

router.get('/', formApp);
router.post('/submit-form', thanks);

module.exports = router;