import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const BUCKETNAME:string="bucketName"
// Initialize the S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const UploadProductFileToS3 = async (productId: string, file: Express.Multer.File,isCover:Boolean) => {
  // Create a unique file name
  const fileName = `${Date.now()}_${file.originalname}`;

  // Generate thumbnail buffer and save in db
  if(isCover){
    const thumbnailBuffer = await sharp(file.buffer)
    .resize(150, 150) // Resize to 150x150 pixels
    .toBuffer();

    const thumbnailParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${productId}/thumbnail_${fileName}`, // Store in 'thumbnails' folder
        Body: thumbnailBuffer,
        ContentType: file.mimetype,
    //    ACL: 'public-read', // Optional: Set file to be publicly readable
    };
       // Upload thumbnail
    const thumbnailCommand = new PutObjectCommand(thumbnailParams);
    const thumbnailData = await s3Client.send(thumbnailCommand);
  }

  const originalParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${productId}/${fileName}`, // Store in 'original' folder
    Body: file.buffer,
    ContentType: file.mimetype,
   // ACL: 'public-read', // Optional: Set file to be publicly readable
  };


  try {
    // Upload original image
    const originalCommand = new PutObjectCommand(originalParams);
    const originalData = await s3Client.send(originalCommand);

    return {
      image:`${productId}/${fileName}`,
      thumbnail:(isCover) ?`${productId}/thumbnail_${fileName}`:null,
      imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${productId}/${fileName}`, // URL of the uploaded original image
      thumbnailUrl: (isCover) ? `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${productId}/thumbnail_${fileName}`:null, // URL of the uploaded thumbnail
    };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('File upload failed');
  }
};

export const UploadCategoryFileToS3 = async (file: Express.Multer.File) => {
    // Create a unique file name
    const fileName = `${Date.now()}_${file.originalname}`;
  
  
    const originalParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `category/${fileName}`, // Store in 'original' folder
      Body: file.buffer,
      ContentType: file.mimetype,
     // ACL: 'public-read', // Optional: Set file to be publicly readable
    };
  
  
    try {
      // Upload original image
      const originalCommand = new PutObjectCommand(originalParams);
      const originalData = await s3Client.send(originalCommand);
  
      return {
        image:`category/${fileName}`,
        imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/category/${fileName}`, // URL of the uploaded original image
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('File upload failed');
    }
};

export const UpdateImageInS3 = async (file:Express.Multer.File, key:string,isCover:Boolean,thumbnailKey?:string) => {
    try {

        if(isCover){
            const thumbnailBuffer = await sharp(file.buffer)
            .resize(150, 150) // Resize to 150x150 pixels
            .toBuffer();
        
            const thumbnailParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${thumbnailKey}`, // Store in 'thumbnails' folder
                Body: thumbnailBuffer,
                ContentType: file.mimetype,
            //    ACL: 'public-read', // Optional: Set file to be publicly readable
            };
               // Upload thumbnail
            const thumbnailCommand = new PutObjectCommand(thumbnailParams);
            const thumbnailData = await s3Client.send(thumbnailCommand);
        }

        // overwrite file in path against same key so don't need to change data in db
        const params = {
            Bucket: BUCKETNAME,
            Key: key, // The name of the file in S3 (this should match the existing image's key)
            Body: file.buffer,
            ContentType: 'image/jpeg' // Change this to the appropriate content type
        };

        // Upload the file to S3 (this will overwrite the existing image)
        const originalCommand = new PutObjectCommand(params);
        const originalData = await s3Client.send(originalCommand);
    } catch (error) {
        console.error('Error updating file:', error);
    }
};




