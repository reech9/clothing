const express = require("express");
const router= new express.Router();

const Customer = require("../models/customerModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");


router.post("/customer/register", (req,res)=>{
    // to make email feild unique
    const email=req.body.email;
    Customer.findOne({email: email})    
    .then((result)=>{
        if(result!==null){
            res.json({msg: "User already Exists"})
            return;            
        }
        const fn = req.body.fn;
        const ln = req.body.ln;
        const age=req.body.age;

        // encryts password--- store the password in hashed_pw 
        const password=req.body.password;
        bcryptjs.hash(password, 10,(e, hashed_pw)=>{
            const data = new Customer({
                fn:fn,
                ln:ln,
                email:email,
                password:hashed_pw,
                age:age
            })
            data.save()
            .then((result) => {
                res.json({message: "User Registered"})
    
            
            })
            .catch((err) => {
                res.json(e)
            });

        })

       

    })
    

    

})

// login for customer
router.post("/customer/login",(req,res)=>{
    const email = req.body.email;

    // to check if email is valid/exist
    Customer.findOne({email: email})
    .then((result)=>{
        if(result==null){
            res.json({message:"Invalid credential********"})
            return;
        }
        // but if the email is valid then--
        const password = req.body.password;
        bcryptjs.compare(password , result.password, (e, success)=>{
            if(success==false){
                res.json({message: "Invalid credentials*******"})
                return;
            }

            // res.json({message: "logged in"})
            // .sign--generates token (for verification) 
            // -id card with logged in user id ----everest:secretkey
            jwt.sign({customer_id: result._id}, "everest", (e,token)=>{
                res.json({token: token})


            })
               
        })
    })
    .catch(e=>{
        res.json(e)
    })

    const password = req.body.password;
})

// customerGuard---mediator---
router.put("/customer/update", auth.customerGuard, (req,res)=>{
    
})


module.exports=router;