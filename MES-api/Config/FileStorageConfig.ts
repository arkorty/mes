import fs from 'fs';
import multer from "multer";
import { FilePaths } from '../Common/Common';
import path from 'path';

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export middleware for different upload scenarios
export const productUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

//saving file in path and returning its name so it can be saved in db
export const WriteFileToPath=(uploadPath:string,file:Express.Multer.File)=>{
  try {
    if(!uploadPath && !file) return 'Error'
    else{
      const fileName=`${file.originalname}`.replace(" ","_")
      const filePath=path.join(uploadPath,fileName);
      fs.writeFileSync(filePath,file.buffer);
    }
  } catch (error:any) {
    console.error(`Error saving file ${file.originalname}:`, error)
    return 'Error'
  }
}

