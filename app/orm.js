const db = require( './connection' )('burgers_db','rootroot')


function selectAll(){
    const sql = `SELECT * FROM burgers;`
    return db.query( sql )
}

function selectAllTrue(){
    const sql = `select * from burgers where devoured = true;`
    return db.query( sql )
}

function insertOne(burgerName){
    const sql = `INSERT INTO burgers (burger_name) values ("${burgerName}")`
    return db.query(sql)
}

function updateOne(id){
    const sql = `UPDATE burgers SET devoured = 1 WHERE id = ${id};`
    return db.query(sql)
}

module.exports = { selectAll, insertOne, updateOne, selectAllTrue }