import express, { request, response } from "express";
import mariadb from "mariadb";
import lodash from "lodash";
import person from "./Repository/person.js";
// mariadb config
var host = "localhost";
var user = "youtuber";
var database = "youtuber";
var password = "123456";
var db = mariadb.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
});
// end config mariadb 
// more shorter but if you want to escapulate the function x(request,response) it depend on your structure
var application = express();
application.listen(3000);
application.use(express.urlencoded({ extended: true }));
application.set('view engine', 'ejs');
application.use(express.static('public'));
application.use(express.json());
application.get("/", (request, response) => {
    var notification = (request.query.notification) ? request.query.notification : "";
    db.then(connection => {
        var result = connection.query("SELECT * FROM person");
        lodash.difference(result['meta']);
        return result;
    }).then((result) => {
        response.render("pages/index.ejs", {
            "data": result,
            "notification": notification
        });
    }).catch(error => {
        console.log(error.message);
    });



});
application.get("/api", (request, response) => {
    // for sure somebody want to try to hack playing around .. it's depend on on to add extra token or something
    response.render("/pages/500.ejs");
});
application.post("/api", (request, response) => {

    switch (request.body.mode) {
        case "create": person.createRecord(db, request, response); break;
        case "read": person.readRecord(db, lodash, response); break;
        case "update": person.updateRecord(db, request, response); break;
        case "delete": person.deleteRecord(db, request, response); break;
    }
});

