/********************************************************************************* *
 *  WEB322 – Assignment 02 *
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * 
 * of this assignment has been copied manually or electronically from any other source *
 *  (including 3rd party web sites) or distributed to other students. *
 * Name: Khizar Mehmood Student ID: 126302215 Date: June 3, 2022 * 
 * Online (Heroku) Link: ________________________________________________________ * 
 * ********************************************************************************/
 var express = require("express")
 var app = express()
 var blogService = require ("./blog-service.js")
 var path = require ("path")
 
 var HTTP_PORT = process.env.PORT || 8080;
 
 // call this function after the http server starts listening for requests
 function onHTTPStart(){
     console.log("Express http server listening on " + HTTP_PORT)
 }
 
 app.use(express.static('public')); 
 
 
 app.get("/", (req, res) => {
     res.redirect('/about')
 })
 
 app.get("/about", function(req,res){
     res.sendFile(path.join(__dirname, "/views/about.html"))
 })
 
 app.get("/blog", function(req,res){
     blogService.getPublishedPosts().then((blogService)=>{
         res.json(blogService)
     })
  
 })
 
 app.get("/posts", function(req,res){
     blogService.getAllposts().then((blogService)=>{
         res.json(blogService)
     })
  
 })
 
 app.get("/categories", function(req,res){
     blogService.getCategories().then((blogService)=>{
         res.json(blogService)
     })
  
 })
 
 app.use((req,res)=>{
     res.status(404).send("Page Not Found")
 })
 
 
 
  blogService.initialize().then(function(){
      app.listen(HTTP_PORT,onHTTPStart)
 }).catch(function(err){
 console.log("unable to start a server: " + err.message)
 })
 
 
 
 
 