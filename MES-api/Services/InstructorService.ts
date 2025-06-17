import {
  UploadInstructorImageToS3,
  DeleteInstructorImageFromS3,
} from "../Config/AwsS3Config";
import { InstructorModel } from "../Models/Instructor";

export class InstructorService {
  public async UploadInstructorImage(
    instructorId: string,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Uploaded file must be an image");
      }

      const instructorData = await InstructorModel.findById(instructorId);
      if (!instructorData) {
        throw new Error("Instructor not found");
      }

      if (
        instructorData.image &&
        process.env.R2_PUBLIC_URL &&
        instructorData.image.includes(process.env.R2_PUBLIC_URL)
      ) {
        try {
          const imageUrl = instructorData.image;
          const imagePath = imageUrl.replace(
            `${process.env.R2_PUBLIC_URL}/`,
            ""
          );

          await DeleteInstructorImageFromS3(imagePath);
        } catch (error) {
          console.error("Failed to delete existing instructor image", error);
        }
      }

      const { image, url } = await UploadInstructorImageToS3(
        instructorId,
        file
      );

      await InstructorModel.findByIdAndUpdate(instructorId, { image: url });

      return {
        success: true,
        message: "Instructor image uploaded successfully",
        data: {
          image,
          url,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
}

export const instructorService = new InstructorService();
