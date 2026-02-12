const express = require('express');
const router = express.Router();
const { subscribeUser, unsubscribeUser} = require('../controllers/subscribe.controllers.js');

router.post('/subscribe', subscribeUser);
router.post('/unsubscribe', unsubscribeUser)
module.exports = router;
