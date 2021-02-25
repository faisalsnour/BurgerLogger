const db = require( './connection' )('burgers_db','rootroot')


function selectAll(){
    const sql = `SELECT * FROM burgers `
    return db.query( sql )
}

function insertOne(burgerName){
    const sql = `INSERT INTO burgers (burger_name) values ("${burgerName}")`
    return db.query(sql)
}

function updateOne(){
    
}

module.exports = { selectAll, insertOne, updateOne }