// Using a router to service page requests
const express = require('express')
const router = express.Router()
const port = 3000
const projects = require('../data/projects.js')
const path = require('path')

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})

router.get('/contact', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/contact.html'))
})

router.get('/projects', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/projects_home.html'))
})

router.get('/projects/:slug', (req,res)=>{
    myproject = projects.filter((e)=>{
        return e.slug == req.params.slug;
    })
    console.log
    res.sendFile(path.join(__dirname,'../templates/project_details.html'))
})
    
router.get('/about', (req,res)=>{
    res.write("This page is in development.");
    res.end();
    //res.sendFile(path.join(__dirname,'../templates/contact.html'))
})

module.exports = router;
