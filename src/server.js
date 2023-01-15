const express = require("express");
const app = express();
const port = 3426;
const path = require('path');
const handles = require('express-handlebars');
const bodyParse = require('body-parser')
const db = require('./config');
const route = require('./route/index')
const cookie = require("cookie-parser")
const nodeMailer = require("nodemailer")
const methodOvRide = require("method-override");
const cors = require("cors")
//const { Socket } = require("dgram");
var server = require('http').createServer(app)
var io = require("socket.io")(server)
const Socket_Shipment = require("./Socket/socketShipment")
const Socket_Detail = require("./Socket/socketDetail")
const Socket_Order = require("./Socket/socketOrders")
const Socket_contact = require("./Socket/socketContact")

var admin = require("firebase-admin")
var serviceAdmin = require("./config/clothesshopreview-firebase-adminsdk-9k558-dd778fa742.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAdmin)
});


 
app.use(express.urlencoded({
    extended : true
 }))

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors())

app.use(methodOvRide("_method"))

app.use(cookie());

app.engine("hbs", handles.engine({
      extname : ".hbs",
      helpers : {
         length : (arr) => arr.lenght,
         changeArr : (arr) => {
             const array = Object.keys(arr)
             return array.length;
         }
      }
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources//views"))

db.connect();

route(app);

Socket_Shipment(io)
Socket_Detail(io, app)
Socket_Order(io, admin)
Socket_contact(io, admin)

console.log(`http://localhost:${port}`)

server.listen(port);

