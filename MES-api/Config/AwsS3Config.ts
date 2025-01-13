import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

// https://<account_id>.r2.cloudflarestorage.com/<YOUR_BUCKET_NAME>/<image_name>
//R2 image url

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export const UploadProductFileToS3 = async (
  productId: string,
  file: Express.Multer.File,
  isCover: Boolean
) => {
  // Create a unique file name
  const fileName = `${Date.now()}_${file.originalname}`;
  try {
    if (isCover) {
      const thumbnailBuffer = await sharp(file.buffer)
        .resize(150, 150) // Resize to 150x150 pixels
        .toBuffer();
      // Upload thumbnail
      const thumbnailCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${productId}/thumbnail_${fileName}`, // Store in 'thumbnails' folder
        Body: thumbnailBuffer,
        ContentType: file.mimetype,
      });
      await r2Client.send(thumbnailCommand);
    }
    // Upload original image
    const originalCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `${productId}/${fileName}`, // Store in 'original' folder
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read', // Optional: Set file to be publicly readable
    });
    await r2Client.send(originalCommand);

    return {
      image: `${productId}/${fileName}`,
      thumbnail: isCover ? `${productId}/thumbnail_${fileName}` : null,
      imageUrl: `${process.env.R2_PUBLIC_URL}/${productId}/${fileName}`, // URL of the uploaded original image
      thumbnailUrl: isCover
        ? `${process.env.R2_PUBLIC_URL}/${productId}/thumbnail_${fileName}`
        : null, // URL of the uploaded thumbnail
    };
  } catch (error) {
    console.error("Error uploading file to R2:", error);
    throw new Error("File upload failed to R2 storage");
  }
};

export const UploadCategoryFileToS3 = async (file: Express.Multer.File) => {
  // Create a unique file name
  const fileName = `${Date.now()}_${file.originalname}`;

  try {
    // Upload original image
    const originalCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `category/${fileName}`, // Store in 'original' folder
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await r2Client.send(originalCommand);

    return {
      image: `category/${fileName}`,
      imageUrl: `${process.env.R2_PUBLIC_URL}/category/${fileName}`, // URL of the uploaded original image
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("File upload failed");
  }
};

export const UpdateImageInS3 = async (
  file: Express.Multer.File,
  key: string,
  isCover: Boolean,
  thumbnailKey?: string
) => {
  try {
    if (isCover) {
      const thumbnailBuffer = await sharp(file.buffer)
        .resize(150, 150) // Resize to 150x150 pixels
        .toBuffer();
      const thumbnailCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${thumbnailKey}`, // Store in 'thumbnails' folder
        Body: thumbnailBuffer,
        ContentType: file.mimetype,
      });
      await r2Client.send(thumbnailCommand);
    }
    // Upload the file to S3 (this will overwrite the existing image)
    const originalCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key, // The name of the file in S3 (this should match the existing image's key)
      Body: file.buffer,
      ContentType: "image/jpeg", // Change this to the appropriate content type
    });
    await r2Client.send(originalCommand);
  } catch (error) {
    console.error("Error updating file:", error);
  }
};

export const DeleteImageFromS3 = async (
  key: string,
  isCover: Boolean,
  thumbnailKey?: string
): Promise<void> => {
  try {
    if (isCover) {
      const thumbnailCommand = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: thumbnailKey,
      });
      await r2Client.send(thumbnailCommand);
    }
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });
    await r2Client.send(command);
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw new Error("Image deletion failed");
  }
};
