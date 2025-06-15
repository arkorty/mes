import { Request, Response } from "express";
import { ClassModel } from "../Models/Class";
import { classService } from "../Services/ClassService";
import {
  DeleteClassImageFromS3,
  UploadClassImageToS3,
} from "../Config/AwsS3Config";

const validateClassData = (data: any, fieldsToValidate?: string[]) => {
  const requiredFields = fieldsToValidate || [
    "title",
    "shortDescription",
    "description",
    "image",
    "instructor",
    "level",
    "duration",
    "location",
    "dates",
    "price",
    "capacity",
    "spotsLeft",
  ];

  const missingFields = requiredFields.filter((field) => {
    if (field === "dates") {
      return (
        !data[field] || !Array.isArray(data[field]) || data[field].length === 0
      );
    }
    return (
      data[field] === undefined || data[field] === null || data[field] === ""
    );
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      image,
      instructor,
      instructorBio,
      instructorImage,
      level,
      duration,
      location,
      dates,
      price,
      capacity,
      spotsLeft,
      skillsCovered,
      details,
    } = req.body;

    const classData = {
      title,
      shortDescription,
      description,
      image,
      instructor,
      instructorBio,
      instructorImage,
      level,
      duration,
      location,
      dates,
      price,
      capacity,
      spotsLeft,
      skillsCovered,
      details,
    };

    const fieldsToValidate = [...Object.keys(classData)];
    if (req.file) {
      fieldsToValidate.splice(fieldsToValidate.indexOf("image"), 1);
    }

    const validation = validateClassData(
      classData,
      req.file ? fieldsToValidate : undefined
    );
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missingFields.join(
          ", "
        )}`,
      });
    }

    const newClass = await ClassModel.create(classData);

    if (req.file && newClass._id) {
      try {
        const { url } = await UploadClassImageToS3(
          newClass._id.toString(),
          req.file
        );
        newClass.image = url;
        await newClass.save();
      } catch (error) {
        console.error("Failed to upload class image during creation", error);
      }
    }

    return res.status(201).json({ success: true, data: newClass });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getClasses = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string)) || 1;
    const limit =
      Math.min(100, Math.max(1, parseInt(req.query.limit as string))) || 10;

    const skip = (page - 1) * limit;

    const [classes, totalCount] = await Promise.all([
      ClassModel.find({}).skip(skip).limit(limit).lean(),
      ClassModel.countDocuments({}),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      success: true,
      data: classes,
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
    console.error("Error fetching classes:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch classes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const found = await ClassModel.findById(id);
    if (!found)
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    return res.status(200).json({ success: true, data: found });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      shortDescription,
      description,
      image,
      instructor,
      instructorBio,
      instructorImage,
      level,
      duration,
      location,
      dates,
      price,
      capacity,
      spotsLeft,
      skillsCovered,
      details,
    } = req.body;

    const updateData = {
      ...(title !== undefined && { title }),
      ...(shortDescription !== undefined && { shortDescription }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(instructor !== undefined && { instructor }),
      ...(instructorBio !== undefined && { instructorBio }),
      ...(instructorImage !== undefined && { instructorImage }),
      ...(level !== undefined && { level }),
      ...(duration !== undefined && { duration }),
      ...(location !== undefined && { location }),
      ...(dates !== undefined && { dates }),
      ...(price !== undefined && { price }),
      ...(capacity !== undefined && { capacity }),
      ...(spotsLeft !== undefined && { spotsLeft }),
      ...(skillsCovered !== undefined && { skillsCovered }),
      ...(details !== undefined && { details }),
    };

    if (Object.keys(updateData).length > 1) {
      const validation = validateClassData(updateData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${validation.missingFields.join(
            ", "
          )}`,
        });
      }
    }

    const updated = await ClassModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const classToDelete = await ClassModel.findById(id);
    if (!classToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    if (
      classToDelete.image &&
      process.env.R2_PUBLIC_URL &&
      classToDelete.image.includes(process.env.R2_PUBLIC_URL)
    ) {
      try {
        const imageUrl = classToDelete.image;
        const imagePath = imageUrl.replace(`${process.env.R2_PUBLIC_URL}/`, "");

        await DeleteClassImageFromS3(imagePath);
      } catch (error) {
        console.error("Failed to delete class image", error);
      }
    }

    await ClassModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Class deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadClassImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const { id } = req.params;

    const classExists = await ClassModel.findById(id);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const result = await classService.UploadClassImage(id, req.file);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
