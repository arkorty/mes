import { User } from "../Models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

let UserList = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search ? String(req.query.search) : "";
  const currentPage = Number(req.query.page) || 1;
  try {
    let users = await User.find({ name: { $regex: search, $options: "i" } })
      .sort({ createdOn: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit);

    if (!users) return res.status(400).json({ success: false, data: [] });
    let totalCount = await User.find({}).countDocuments();

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      data: users,
      currentPage: currentPage,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

let AddUser = async (req: Request, res: Response) => {
  const { name, email, password, mobile, role, address, picture } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !mobile ||
    (role === undefined && role === null)
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, password, mobile, role",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      role,
      address,
      picture,
    });
    const responseObj: any = newUser.toObject();
    delete responseObj.password;
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: responseObj,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let EditUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, mobile, role, address, picture } = req.body;
  if (!name || !mobile || (role === undefined && role === null)) {
    return res.status(400).json({
      success: false,
      message: `Please provide ${!name ? "name, " : ""}${
        !mobile ? "mobile, " : ""
      }${!role ? "role" : ""}`,
    });
  }
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    user.name = name;
    user.mobile = mobile;
    user.role = role;
    user.address = address;
    user.picture = picture;
    const updatedUser = await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      let user = await User.findById(id);
      if (user) {
        let removedUser = await User.deleteOne({ _id: id });
        if (removedUser) {
          return res.status(200).json({
            success: true,
            message: `User Delete successfully`,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `Id not found`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let UserDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      let user = await User.findById(id);
      if (user) {
        return res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: `Provide Id`,
      });
    }
  } catch (err: any) {}
};

export { UserList, DeleteUser, UserDetails, AddUser, EditUser };
