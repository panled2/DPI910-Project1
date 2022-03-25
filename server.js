const path = require('path')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const User = require('./module/user')
const express= require('express')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())


app.post('/api/login', async (req,res) =>{
    const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

    const pass = await User.findOne({ password }).lean()

	if (!pass) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

})

app.post('/api/register', async (req,res) =>{
    console.log(req.body)
    
    const { username, password } = req.body

    try {
        const response = await User.create({
            username, 
            password
        })
        console.log('User has been created!! ', response)
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error'})
    }
    res.json({ status: 'ok'})
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})