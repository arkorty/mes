import { Request, Response } from "express";
import { InstructorModel } from "../Models/Instructor";

const validateInstructorData = (data: any) => {
  const requiredFields = ["name", "mobile", "email"];

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

export const getAllInstructors = async (req: Request, res: Response) => {
  try {
    const instructors = await InstructorModel.find();
    return res.status(200).json({ success: true, data: instructors });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid instructor ID format" });
    }

    const instructor = await InstructorModel.findById(id);

    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    return res.status(200).json({ success: true, data: instructor });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createInstructor = async (req: Request, res: Response) => {
  try {
    const { name, bio, image, certifications, mobile, email } = req.body;

    const instructorData = {
      name,
      bio,
      image,
      certifications,
      mobile,
      email,
    };

    const validation = validateInstructorData(instructorData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missingFields.join(
          ", "
        )}`,
      });
    }

    if (mobile && !/^[+]?[\d\s-]{10,15}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be valid and between 10-15 digits, can include spaces, hyphens and + prefix",
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email format is invalid",
      });
    }

    const newInstructor = new InstructorModel(instructorData);
    const savedInstructor = await newInstructor.save();

    return res.status(201).json({ success: true, data: savedInstructor });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid instructor ID format" });
    }

    const { name, bio, image, certifications, mobile, email } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (image !== undefined) updateData.image = image;
    if (certifications !== undefined)
      updateData.certifications = certifications;
    if (mobile !== undefined) updateData.mobile = mobile;
    if (email !== undefined) updateData.email = email;

    if (
      Object.keys(updateData).some((key) =>
        ["name", "mobile", "email"].includes(key)
      )
    ) {
      const currentInstructor = await InstructorModel.findById(id);
      if (!currentInstructor) {
        return res
          .status(404)
          .json({ success: false, message: "Instructor not found" });
      }

      const mergedData = {
        name: updateData.name || currentInstructor.name,
        mobile: updateData.mobile || currentInstructor.mobile,
        email: updateData.email || currentInstructor.email,
      };

      const validation = validateInstructorData(mergedData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${validation.missingFields.join(
            ", "
          )}`,
        });
      }
    }

    if (mobile && !/^[+]?[\d\s-]{10,15}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be valid and between 10-15 digits, can include spaces, hyphens and + prefix",
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email format is invalid",
      });
    }

    const updatedInstructor = await InstructorModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedInstructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    return res.status(200).json({ success: true, data: updatedInstructor });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid instructor ID format" });
    }

    const deletedInstructor = await InstructorModel.findByIdAndDelete(id);

    if (!deletedInstructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Instructor deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
