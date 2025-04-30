import { atom } from 'jotai';

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user) return null;
    
    // Parse the user string to object first
    const parsedUser = JSON.parse(user);
    
    // Then add the token to the parsed object
    return { ...parsedUser, token };
  } catch (err) {
    console.error('Invalid user data in localStorage:', err);
    return null;
  }
};

export const userAtom = atom(getInitialUser());