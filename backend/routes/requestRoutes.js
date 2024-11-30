const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/requestController');

// Route to create a new request
router.post('/', createRequest);

router.get('/get', getRequests);

module.exports = router;
