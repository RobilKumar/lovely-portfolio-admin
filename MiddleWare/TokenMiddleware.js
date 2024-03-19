const jwt = require("jsonwebtoken");

const  AuthenticateToken=(req,res,next)=>{
    const token = req.headers['authorization'];


    if (token == null) return res.sendStatus(401);



    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
       
        req.user = user;
        next();
    });
}

module.exports={AuthenticateToken};