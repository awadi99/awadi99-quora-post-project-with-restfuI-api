const express = require('express');
const app = express();
const path = require("path");
const { v4: uuidv4}= require( 'uuid' ) ;
const methodOverride =require("method-override")

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const port = process.env.PORT || 9990;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});


let posts =[ 
    {  
         id:uuidv4 ( ),
        username:"AW",
        content:"I Love Coding"
    },
        {
        id:uuidv4 ( ),
        username:"aditya",
        content:"I Love running too"
    },
        {
        id:uuidv4 ( ),
        username:"apancollege",
        content:"I am good teacher"
    },

       {
        id:uuidv4 ( ),
        username:"rahul_kumar",
        content : " i got selected for my 1st intership"
    }
]


// index main
app.get('/posts',(req,res)=>{
console.log("Serving working well")
res.render("index.ejs",{posts});
}); 


// create a new post
app.get('/posts/new',(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content }=req.body;
    let id=uuidv4 ( );
    posts.push({id,username,content});
    res.redirect('/posts');
});
// find id
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);

    if(post)
    {
         res.render("show.ejs",{post});
    }
    else{
        res.render("Error.ejs");
    } 
});

// update route 
app.patch("/posts/:id",(req,res)=>{
        let {id}=req.params; 
        let newContent=req.body.content;
        console.log(newContent)
        let post=posts.find((p)=>id === p.id);
        post.content=newContent;
        res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
        let {id}=req.params; 
        let post=posts.find((p)=>id === p.id);
        res.render("edit.ejs",{post});

});

// delete route
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params; 
    posts=posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
});

// logout
app.get("/logout",(req,res)=>{
    res.render("underdevelopment.ejs");
});