import User from "../models/user.model.js";
import {z} from 'zod'
import bcrypt from 'bcrypt'
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
    email:z.string().email({message:"invaid email addredd"}),
    username: z.string().min(3 , {message:"Username atleast 3 characters long"}).max(30),
    password:z.string().min(6 ,{message:"Password atleast 6 characters long"}).max(20),

})
export const register = async  (req , res ) =>{


    try{

        const {email , username , password} = req.body;
       
        if(!email || !username || !password) {
       return res.status(400).json({errors:"All fields required"})
       }
        const validation = userSchema.safeParse({
        email , username , password
       })
       if(!validation.success){
        
       const errorMessage= validation.error.errors.map((err) => err.message)
       return res.status(400).json({error: errorMessage})
       }

        const user =  await User.findOne({email})
        if (user){
            return res.status(400).json({errors:"user already registered"})
        }
        const hashPassword = await bcrypt.hash(password , 10)
       


        const newUser = new User({email  , username, password:hashPassword});

        await newUser.save();
        if(newUser){

          const token =  await  generateTokenAndSaveInCookies(newUser._id , res);
            res.status(200).json({message:"User registered Successfully" , newUser , token})
        }

    }catch(error){
        console.log(error);
        res.status(400).json({message:"user registering error"})

    }
}

export const login  =  async (req , res ) =>{

 const {email , password} = req.body;
 try{
if(!email || !password){
    return res.status(400).json({message: "all field required "})
}
const user = await User.findOne({email}).select("+password")

if(!user || !(await  bcrypt.compare(password , user.password))){

    return res.status(400).json({errors: "Invalid email or password"})
}
 const token =  await  generateTokenAndSaveInCookies(user._id , res);
res.status(200).json({message: "Logged in successfully" , user , token });
 }catch(error){
    res.status(400).json({message:"Error logging user"})
 }
   
}

export const logout = (req , res ) =>{
   try{
 res.clearCookie("jwt" , {path : "/"},);
 res.status(200).json({message: "logged out  successfully" , user , token });

   }catch(error){
    console.log(error);
    res.status(400).json({message:"Error log out user"})

   }
}