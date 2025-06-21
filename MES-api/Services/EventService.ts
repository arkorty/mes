import {
  UploadClassImageToS3,
  DeleteClassImageFromS3,
} from "../Config/AwsS3Config";
import { EventModel } from "../Models/Event";

export class EventService {
  public async UploadEventImage(
    eventId: string,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Uploaded file must be an image");
      }

      const eventData = await EventModel.findById(eventId);
      if (!eventData) {
        throw new Error("Event not found");
      }

      if (
        eventData.image &&
        process.env.R2_PUBLIC_URL &&
        eventData.image.includes(process.env.R2_PUBLIC_URL)
      ) {
        try {
          const imageUrl = eventData.image;
          const imagePath = imageUrl.replace(
            `${process.env.R2_PUBLIC_URL}/`,
            ""
          );

          await DeleteClassImageFromS3(imagePath);
        } catch (error) {
          console.error("Failed to delete existing event image", error);
        }
      }

      // Using the same S3 functions as Class but for Event images
      const { image, url } = await UploadClassImageToS3(eventId, file);

      await EventModel.findByIdAndUpdate(eventId, { image: url });

      return {
        success: true,
        message: "Event image uploaded successfully",
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

export const eventService = new EventService();
