//import * as dotenv from 'dotenv';
const {  mongoose } = require('mongoose');

require('dotenv').config();

export const DbConnect=async()=>{     
   await mongoose.connect(`mongodb+srv://xsubhra100:lXqxWyD8va3CJ44R@cluster0.mnwsb.mongodb.net/`)
   .then((res:Response)=>{
     console.log(`Connected to DB`);
   })
   .catch((err:any)=>console.error(`Db error ${err}`));
}

export default DbConnect;