// we refactor a bit here 
function createRecord(db, request, response) {
    // now we do basic code and copy the rest 
    db.then(connection => {
        // start 
        connection.beginTransaction()
            .then(() => {
                return connection.query("INSERT INTO person (name,age) VALUES (?,?);", [request.body.name, request.body.age]);
            }).then((result) => {
                // if anything not wrong .. commit to db 
                connection.commit();
                response.status(200).json({
                    "status": true,
                    "message": "Record inserted",
                    "lastInsertId": result.insertId
                });
            }).catch((error) => {
                console.log(error.message);

            });
    }).catch(error => {
        console.log(error.message);
    });
}
function readRecord(db, lodash, response) {
    // as usual read we didn't need transaction .. 
    db.then(connection => {
        var result = connection.query("SELECT * FROM person");
        // we don't know  why mariad db send meta value soo 
        // so now we remove those whateer weird key 
        lodash.difference(result['meta']);
        return result;
    }).then((result) => {
        // double because whatever trend these day .. promise ?  something like async 
        response.status(200).json({ status: true, "data": result });
    }).catch(error => {
        console.log(error.message);
    });
}
function updateRecord(db, request, response) {
    db.then(connection => {
        // start 
        connection.beginTransaction()
            .then(() => {
                return connection.query("update person set name = ? ,age = ? WHERE personId = ?;", [request.body.name, request.body.age, request.body.personId]);
            }).then((result) => {
                // if anything not wrong .. commit to db 
                connection.commit();
                response.status(200).json({
                    "status": true,
                    "message": "Record updated"
                });
            }).catch((error) => {
                console.log(error.message);

            });
    }).catch(error => {
        console.log(error.message);
    });
}
function deleteRecord(db, request, response) {
    db.then(connection => {
        // start 
        connection.beginTransaction()
            .then(() => {
                return connection.query("DELETE FROM person WHERE personId = ? ;", [request.body.personId]);
            }).then((result) => {
                // if anything not wrong .. commit to db 
                connection.commit();
                response.status(200).json({
                    "status": true,
                    "message": "Record deleted"
                });
            }).catch((error) => {
                console.log(error.message);

            });
    }).catch(error => {
        console.log(error.message);
    });
}
export default { createRecord, readRecord, updateRecord, deleteRecord };