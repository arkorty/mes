import { Request, Response } from "express";
import { EventModel } from "../Models/Event";
import { eventService } from "../Services/EventService";

// Helper function to parse JSON strings if needed
const parseIfJson = (data: any) => {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
};

const validateEventData = (data: any, fieldsToValidate?: string[]) => {
  const requiredFields = fieldsToValidate || [
    "title",
    "shortDescription",
    "description",
    "image",
    "type",
    "date",
    "time",
    "location",
    "price",
    "capacity",
    "spotsLeft",
  ];

  const missingFields = requiredFields.filter((field) => {
    return (
      data[field] === undefined || data[field] === null || data[field] === ""
    );
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      image,
      type,
      date,
      time,
      location,
      price,
      capacity,
      spotsLeft,
      tags,
      details,
    } = req.body;

    const eventData = {
      title,
      shortDescription,
      description,
      image: req.file ? "pending_upload" : image,
      type,
      date,
      time,
      location,
      price,
      capacity,
      spotsLeft,
      tags: parseIfJson(tags),
      details: parseIfJson(details),
    };

    const fieldsToValidate = [...Object.keys(eventData)];

    fieldsToValidate.splice(fieldsToValidate.indexOf("image"), 1);

    const validation = validateEventData(eventData, fieldsToValidate);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missingFields.join(
          ", "
        )}`,
      });
    }

    if (!req.file && (!image || image === "")) {
      return res.status(400).json({
        success: false,
        message: "Either an image file or an image URL must be provided",
      });
    }

    const newEvent = await EventModel.create(eventData);

    if (req.file && newEvent._id) {
      try {
        const result = await eventService.UploadEventImage(
          newEvent._id.toString(),
          req.file
        );
        newEvent.image = result.data.url;
        await newEvent.save();
      } catch (error) {
        console.error("Failed to upload event image during creation", error);

        await EventModel.findByIdAndDelete(newEvent._id);
        return res.status(500).json({
          success: false,
          message: "Failed to upload event image",
        });
      }
    }

    return res.status(201).json({ success: true, data: newEvent });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string)) || 1;
    const limit =
      Math.min(100, Math.max(1, parseInt(req.query.limit as string))) || 10;

    const skip = (page - 1) * limit;

    const [events, totalCount] = await Promise.all([
      EventModel.find({}).skip(skip).limit(limit).lean(),
      EventModel.countDocuments({}),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      success: true,
      data: events,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const found = await EventModel.findById(id);
    if (!found)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    return res.status(200).json({ success: true, data: found });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      shortDescription,
      description,
      image,
      type,
      date,
      time,
      location,
      price,
      capacity,
      spotsLeft,
      tags,
      details,
    } = req.body;

    const eventToUpdate = await EventModel.findById(id);
    if (!eventToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const fieldsToUpdate = {
      ...(title !== undefined && { title }),
      ...(shortDescription !== undefined && { shortDescription }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && !req.file && { image }),
      ...(type !== undefined && { type }),
      ...(date !== undefined && { date }),
      ...(time !== undefined && { time }),
      ...(location !== undefined && { location }),
      ...(price !== undefined && { price }),
      ...(capacity !== undefined && { capacity }),
      ...(spotsLeft !== undefined && { spotsLeft }),
      ...(tags !== undefined && { tags: parseIfJson(tags) }),
      ...(details !== undefined && { details: parseIfJson(details) }),
    };

    if (req.file) {
      try {
        if (
          eventToUpdate.image &&
          process.env.R2_PUBLIC_URL &&
          eventToUpdate.image.includes(process.env.R2_PUBLIC_URL)
        ) {
          // Delete old image would be handled here
          console.log("Would delete old image:", eventToUpdate.image);
        }

        const result = await eventService.UploadEventImage(id, req.file);
        fieldsToUpdate.image = result.data.url;
      } catch (error) {
        console.error("Failed to upload event image during update", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload event image",
        });
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const updated = await EventModel.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await EventModel.findById(id);
    if (!eventToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    if (
      eventToDelete.image &&
      process.env.R2_PUBLIC_URL &&
      eventToDelete.image.includes(process.env.R2_PUBLIC_URL)
    ) {
      try {
        // Delete image would be handled here
        console.log("Would delete image:", eventToDelete.image);
      } catch (error) {
        console.error("Failed to delete event image", error);
      }
    }

    await EventModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadEventImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const { id } = req.params;

    const eventExists = await EventModel.findById(id);
    if (!eventExists) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const result = await eventService.UploadEventImage(id, req.file);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
