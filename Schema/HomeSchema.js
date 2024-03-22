const  mongoose= require('mongoose');
const Schema= mongoose.Schema;


const homeSchema= new Schema({
    Description:{
        type:String,
         default:null
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        refer: "admin",// it is refer from admin 
    },
    AboutData:{
        type:String,
        default:null
    }
})

module.exports=mongoose.model("HomeData",homeSchema);