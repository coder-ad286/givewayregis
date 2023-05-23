const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require('body-parser');
const route = require("./Route/route");
const {engine} = require("express-handlebars");
const connectDataBase = require("./Config/database");

// seeding admins
const admins = require('./Model/adminModel');
(async function seedAdmin(){
	await admins.deleteMany({});
	let admin1 = {
		username : "kmayyadurai286@gmail.com",
		password : "kmayya@123",
		name:"Ayyadurai"
	}
	let admin2 = {
		username : "coderad360@gmail.com",
		password : "coderad@123",
		name:"CoderAD"
	}

	await admins.create(admin1)
	await admins.create(admin2)

})()

app.use(bodyParser.urlencoded({extended:true}));

dotenv.config({path:path.join(__dirname,"Config","config.env")});

app.use(express.static(path.join(__dirname,"..","Frontend","CSS")))
app.use(express.static(path.join(__dirname,"..","Frontend","JS")))

app.set('views',path.join(__dirname,"..","Frontend","HTML"))
app.engine('hbs',engine({extname:'hbs',defaultLayout:false}));
app.set('view engine','hbs');


app.use(express.json())

connectDataBase();

app.use(route)


app.listen(process.env.PORT,()=>{
	console.log("Listening Port 3000...")
})