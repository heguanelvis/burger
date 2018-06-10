// Import the MySQL connection object
var connection = require('./connection.js');

/////////////////////////////////////////////////////////////////////////////////

// Preparation of input and column for orm
function printQuestionMarks(number) {
    var arr = [];

    for (var i = 0; i < number; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }

    return arr.toString();
}

///////////////////////////////////////////////////////////////////////////////

// Orm
var orm = {

    selectAll: (table, cb) => {
        var queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    },

    insertOne: (table, columns, values, cb) => {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";

        connection.query(queryString, values, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    },

    updateOne: (table, objColValues, condition, cb) => {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColValues);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    }
};

module.exports = orm;