const mongoose=require('mongoose')
const WebHook=mongoose.Schema({
    name:String,
    payload:Object,
    addedBy:String,
    city:String
},{
    timestamps:true
    //for addedAt and updatedAt columns automatically
});

module.exports=mongoose.model('WebHook',WebHook);