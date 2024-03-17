const homeSchema= require('../Schema/HomeSchema')



const homeDataUpdate=({dataToHome})=>{
  
    const homeObj= new homeSchema({
         Description:dataToHome
    })
    
   const homeDb=  homeObj.save();
   console.log(dataToHome);
   

}

module.exports={homeDataUpdate}