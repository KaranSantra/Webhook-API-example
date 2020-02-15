const express=require("express")
const bodyParser=require('body-parser')
const MongoClient=require("./database/connection")
const WebHookModel=require("./database/WebHook.model")
const app=express()
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
MongoClient().then(()=>{
    console.log("connected mongo");
}).catch(()=>{
        console.log("mongo connection error")
    })

app.get("/",(req,res)=>{
    res.send("welcome to hands on demo of Webhook")
})
app.get("/api/webhook",(req,res)=>{
    WebHookModel
    .find()
    .then((wh)=> {
        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    })
    .catch(e=> {
        res.json({
            flag: false,
            data: null,
            message: e.message
        });
    })
})

app.post("/api/webhook",(req,res)=>{
    let body=req.body;

    WebHookModel
    .create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully Created"
        });
    })
    .catch(e=> {
        res.json({
            flag: false,
            data: null,
            message: e.message
        });
    })
})

//Update webhook
app.put("/api/webhook/:id", (req, res)=> {
    
    let body = req.body;

    WebHookModel
        .findByIdAndUpdate(req.params.id, body)
        .then((wh)=> {

            res.json({
                flag: true,
                data: wh,
                message: "Successfully updated"
            });
        })
        .catch(e=> {
            res.json({
                flag: false,
                data: null,
                message: e.message
            });
        })
})

app.delete("/api/webhook/:id",(req,res)=>{
    WebHookModel.findByIdAndDelete(req.params.id,function(err,wh){
        if(err){
            res.json({
                flag:false,
                data:null,
                message:err.message
            });
        }else{
            res.json({
                flag:true,
                data:wh,
                message:"Successfully deleted"
            })
        }
    });
})
app.listen(3000)