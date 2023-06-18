const express = require('express');
const app = express();
app.use(express.json());

const {sequelize, employees, Post} = require('./models');
// const employees = require('./models/employees');

app.post('/employees', async(req,res)=>{
    const {name,email,role} = req.body
    
    try{
        const employee = await employees.create({name, email, role});
        return res.json(employee);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/posts', async(req,res)=>{
    const { employeeUUID, body } = req.body;
    try{
        const employee = await employees.findOne({ where : {uuid : employeeUUID}});
        const post = await Post.create({body, empID : employee.id});
      
        return res.json(post);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

app.get('/posts', async(req,res)=>{
    try{        
        const posts = await Post.findAll({include : [employees]}); //include:model name
        return res.json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

app.get('/employees', async(req,res)=>{
    try{
        const employee = await employees.findAll()
        return res.json(employee);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong at GET"});
    }
})

app.get('/employees/:uuid', async(req,res)=>{
    const uuid = req.params.uuid;
    try{
        const employee = await employees.findOne({
            where : {uuid}
        })
        return res.json(employee);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong at GET"});
    }
})

app.put('/employees/:uuid', async(req,res)=>{
    const {name, email , role} = req.body;
    const uuid = req.params.uuid;
    try{
        const employee = await employees.findOne( {where : {uuid}} )
        
        employee.name = name;
        employee.email = email;
        employee.role = role;
        await employee.save();
        return res.json(employee); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong at PUT"});
    }
})
 
app.delete('/employees/:uuid', async(req,res)=>{
    const uuid = req.params.uuid;
    try{
        const employee = await employees.findOne( {where : {uuid}} )
        await employee.destroy();
        return res.json({msg : "Employee Terminated."}); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong at GET"});
    }
})

let port = 5001;
app.listen({port}, async ()=>{
    //note you cannot keep listeing port the same as hosting port
    console.log(`server running on localhost:${port}`);
    await sequelize.authenticate(); 
    console.log('Database Connected!');
})
    
