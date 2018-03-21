const router = require('express').Router()
const data = require('./data')

router.get(`/all`, (request, response, next) => {
	setTimeout(() => response.status(200).json(data), 500)
})


module.exports = router;
