import User from "../modal/user.model.js";
import {z} from 'zod'
import bcrypt from 'bcrypt'
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
    email:z.string().email({mess:"invaid email addredd"}),
    username: z.string().min(3 , {mess:"Username atleast 3 characters long"}).max(30),
    password:z.string().min(6 ,{mess:"Password atleast 6 characters long"}).max(20),

})
export const register = async  (req , res ) =>{


    try{

        const {email , username , password} = req.body;
       
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

        const user =  await User.findOne({email})
        if (user){
            return res.status(400).json({mess:"user already registered"})
        }
        const hashPassword = await bcrypt.hash(password , 10)
       


        const newUser = new User({email  , username, password:hashPassword});

        await new User.save();
        if(newUser){

          const token =  await  generateTokenAndSaveInCookies(newUser._id , res);
            res.status(200).joson({mess:"User registered Successfully" , newUser , token})
        }

    }catch(error){
        console.log(error);
        res.status(400).json({mess:"user registering error"})

    }
}

export const login  =  async (req , res ) =>{

 const {email , password} = req.body;
 try{
if(!email || !password){
    return res.status(400).json({mess: "all field required "})
}
const user = await User.findOne({email}).select("+password")

if(!user || !(await  bcrypt.compare(password , user.password))){

    return res.status(400).json({mess: "Invalid email or password"})
}
 const token =  await  generateTokenAndSaveInCookies(user._id , res);
res.status(200).json({mess: "Loged in successfully" , user , token });
 }catch(error){
    res.status(400).json({mess:"Error logging user"})
 }
   
}

export const logout = (req , res ) =>{
   try{
 res.clearCookie("jwt" , {path : "/"},);
 res.status(200).json({mess: "ged out  successfully" , user , token });

   }catch(error){
    console.log(error);
    res.status(400).json({mess:"Error log out user"})

   }
}