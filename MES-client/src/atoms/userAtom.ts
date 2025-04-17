// import { atom } from 'jotai'

// export const userAtom = atom(JSON.parse(localStorage.getItem('user')) || null)

import { atom } from 'jotai';

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('Invalid user data in localStorage:', err);
    return null;
  }
};

export const userAtom = atom(getInitialUser());
