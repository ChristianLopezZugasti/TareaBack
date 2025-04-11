const {Router} = require('express')

const router = Router();


router.post('/login',require('../controllers/auth'))

module.exports = router