const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'aditya',
    password: 'root',
    port: 5432,
    database: 'postgres'
});

client.connect();

// client.query(`SELECT * FROM stocks`, (err,res)=>{
//     if(!err)
//         console.log(res.rows);
//     else
//         console.log(err.message);

//     client.end;
// });

client.query(`SELECT * FROM stocks;`, (err,res)=>{
    if(!err){
        array = res.rows;
        console.log(array[0].sector+' is the sector of '+array[0].ticker);
       // console.log(res.rows);
    }
    else
        console.log(err.message);

    client.end;
});