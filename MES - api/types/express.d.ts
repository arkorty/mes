
import { User } from '../Models/Users'; 

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
