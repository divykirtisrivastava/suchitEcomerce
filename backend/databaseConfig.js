const mysql= require('mysql')
let connection=mysql.createConnection({
    host: "localhost",
    user:"root",
    database: "sikha_ecommerce",
    password:'1234'

})
module.exports=connection