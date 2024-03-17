const  mongoose= require('mongoose');
const Schema= mongoose.Schema;


const homeSchema= new Schema({
    Description:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("HomeData",homeSchema);