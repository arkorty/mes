import express from 'express';

import {
  Register,
  Login,
  GetUser,
  AdminLogin,
} from '../Controllers/AuthController'; 
import { UserList,UserDetails,DeleteUser, AddUser, EditUser } from '../Controllers/UserController';

const userRouter = express.Router();


// Route for user registration
userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.post('/admin/login', AdminLogin);
userRouter.get("/getUser",GetUser); // get user from token


userRouter.get('/all', UserList);
userRouter.get('/:id', UserDetails);
userRouter.delete('/:id', DeleteUser);
userRouter.post('/add', AddUser)
userRouter.patch('/:id', EditUser)

export default userRouter;
