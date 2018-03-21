const express = require('express')

const table = require('./api/table')

const bodyParser = require('body-parser')
const port = 3001

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use('/api/table', table)

app.listen(port, 'localhost', function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening at http://localhost:' + port);
	}
});
