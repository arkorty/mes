import { Request, Response } from "express";
import { ClassModel } from "../Models/Class";

export const createClass = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newClass = await ClassModel.create(data);
    return res.status(201).json({ success: true, data: newClass });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await ClassModel.find({});
    return res.status(200).json({ success: true, data: classes });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
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
    const updated = await ClassModel.findByIdAndUpdate(id, req.body, {
      new: true,
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
    const deleted = await ClassModel.findByIdAndDelete(id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    return res.status(200).json({ success: true, message: "Class deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
