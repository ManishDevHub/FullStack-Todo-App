  import mongoose from 'mongoose'
import { string } from 'zod';

  const UserSchema = new mongoose.Schema({
    username: {
        type: String ,
        required: true , 
    //     unique: true ,
     } , 
     email:{
        type: String ,
        required: true , 
        unique: true ,
     } ,
     password:{
          type: String ,
        required: true , 
      select:false,
     } , 
     token: {
      type: string,
     }

  }) 

  const User = mongoose.modal("User" , UserSchema);
  export default User;