import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../Models/User';
import { EncodeBase64 } from '../Common/Common';
import catchAsync from '../utils/CatchAsync';
import AppError from '../utils/AppError';



const signToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
};


export const Register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, mobile, password, role, address, picture } = req.body;

  // Hash the password before savingnodeo
  const hashedPassword = await bcrypt.hash(password, process.env.hashSecret as string);

  const newUser = await User.create({
    name,
    email,
    mobile,
    password: hashedPassword,
    role,
    address,
    picture,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
  } catch (error:any) {
    res.status(500).json({message:error.message,error});
  }
};

// Log in an existing user
export const Login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    success: true,
    
    data: {
      user,
      token,
    },
  });
});

//Get user information from the token
export const GetUser = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
      return next(new AppError("No token provided",401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await User.findById((decoded as any).id);

    if(!user){
      return next(new AppError("User not found",404));
    }

    res.status(200).json({
      success:true,
      data:user
    })
  } catch (error) {
    res.status(401).json({message: "Not authorized",error});
  }
})

// Protect middleware (for authenticated routes)
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  req.user = currentUser;
  next();
});

// Middleware to restrict routes to specific roles
export const restrictTo = (...roles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export const AdminLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email })

  if(user){
    var hashedPassword=EncodeBase64(password);
    if(hashedPassword!=user.password) return next(new AppError('Incorrect email or password', 401));
  }
  else{
    return next(new AppError('Incorrect email or password', 401));
  }


  res.status(200).json({
    success: true,
    
    data: {
      user,
    },
  });
});

