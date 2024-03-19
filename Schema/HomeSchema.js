const  mongoose= require('mongoose');
const Schema= mongoose.Schema;


const homeSchema= new Schema({
    Description:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        refer: "admin",// it is refer from admin 
    }
})

module.exports=mongoose.model("HomeData",homeSchema);