

const siteRoute = require('./site')
const logroute = require('./log')
const admroute = require('./admin')
const admapi = require('./admin_api')
const productroute = require("./product")
const aboutRoute = require("./about")
const contactRoute = require('./contact')

function route(app){
    app.use("/api", admapi)
    app.use('/admin', admroute)
    app.use('/login',logroute)
    app.use('/', siteRoute);
    app.use('/product', productroute);
    app.use('/about', aboutRoute  )
    app.use("/contact", contactRoute)
}


module.exports = route