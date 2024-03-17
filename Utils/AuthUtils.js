
function isValidEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //console.log("inside AuthUtils")
    return emailRegex.test(email);
}



// its a validator for register request and 
//using series of variable doesn't matter because its a javascript object
const validateRegisterData=({email,password})=>{
   
     return new Promise((resolve,reject)=>{
        if(!email|| !password) reject("Missing Credential");
      
        if(typeof email!=="string")reject("Invalid datatype of email");
        if(typeof password!=="string")reject("Invalid datatype of password");

       

        if(!isValidEmail(email)){
            reject ("Email format is wrong")
          }

          console.log("inside AuthUtils")
          resolve();
     })
}

module.exports={validateRegisterData,isValidEmail}