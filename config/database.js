const mongoose = require('mongoose')
const DatabaseSetup = () => {
    let DBstring = process.env.DB_CONNECTION_STRING.replace('<USERNAME>', process.env.DB_USERNAME).replace('<PASSWORD>', process.env.DB_PASSWORD)
    mongoose.connect(DBstring)
		.then(() => {
			console.log('Connection to database sucessful')
		})
		.catch(err => {
			console.log('Connection Failed ' + err)
		})
}
module.exports = DatabaseSetup