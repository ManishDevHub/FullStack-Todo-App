import User from "../modal/user.model.js";
import {z} from 'zod'
import bcrypt from 'bcrypt'

const userSchema = z.object({
    email:z.string().email({mess:"invaid email addredd"}),
    username: z.string().min(3 , {mess:"Username atleast 3 characters long"}).max(30),
    password:z.string().min(6 ,{mess:"Password atleast 6 characters long"}).max(20),

})
export const register = async  (req , res ) =>{


    try{

        const {email , username , password} = req.body;
        const user =  await User.findOne({email})
        if (user){
            return res.status(400).json({mess:"user already registered"})
        }
       if(!email || !username || !password) {
        res.status(400).json({mess:"All fields required"})
       }
        const validation = userSchema.safeParse({
        email , username , password
       })
       if(!validation.success){
        
       const errorMessage= validation.error.errors.map((err) => err.mess)
       return res.status(400).json({error: errorMessage})
       }


        const newUser = new User({email  , username, password});

        await new User.save();
        if(newUser){
            res.status(200).joson({mess:"User registered Successfully" , newUser})
        }

    }catch(error){
        console.log(error);
        res.status(400).json({mess:"user registering error"})

    }
}

export const login  = (req , res ) =>{
    console.log("login function called ")
}

export const logout = (req , res ) =>{
    console.log("logout function called ")
}