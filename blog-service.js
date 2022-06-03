var fs = require ("fs")

var posts = []
var categories = []



module.exports.initialize = function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/posts.json',(err,data)=>{
            if(err){
                reject(err)
            }
            posts =JSON.parse(data)
            resolve()
        })
        fs.readFile('./data/categories.json',(err,data)=>{
            if(err){
                reject(err)
            }
            categories =JSON.parse(data)
            resolve()
        })
    })
}


module.exports.getAllposts = function(){
    return new Promise((resolve,reject)=>{
        if(posts.length==0){
            reject("No results returned")
        }else{
            resolve(posts)
        }
    })
}

module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
       let filteredPublished = []
        for(let i = 0; i < posts.length; i++){
            if(posts[i].published == true){
                filteredPublished.push(posts[i])
            }
        }
        if(filteredPublished.length==0){
            reject("No results to be displayed")
        }else{
            resolve(filteredPublished)
        }
    })
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        if(categories.length==0){
            reject("No results returned")
        }else{
            resolve(categories)
        }
    })
}