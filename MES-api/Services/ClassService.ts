import {
  UploadClassImageToS3,
  DeleteClassImageFromS3,
} from "../Config/AwsS3Config";
import { ClassModel } from "../Models/Class";

export class ClassService {
  public async UploadClassImage(
    classId: string,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Uploaded file must be an image");
      }

      const classData = await ClassModel.findById(classId);
      if (!classData) {
        throw new Error("Class not found");
      }

      if (
        classData.image &&
        process.env.R2_PUBLIC_URL &&
        classData.image.includes(process.env.R2_PUBLIC_URL)
      ) {
        try {
          const imageUrl = classData.image;
          const imagePath = imageUrl.replace(
            `${process.env.R2_PUBLIC_URL}/`,
            ""
          );

          await DeleteClassImageFromS3(imagePath);
        } catch (error) {
          console.error("Failed to delete existing class image", error);
        }
      }

      const { image, url } = await UploadClassImageToS3(classId, file);

      await ClassModel.findByIdAndUpdate(classId, { image: url });

      return {
        success: true,
        message: "Class image uploaded successfully",
        response: {
          image,
          url,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
}

export const classService = new ClassService();
