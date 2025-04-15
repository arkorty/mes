import { atom } from 'jotai'

export const userAtom = atom(localStorage.getItem('user') || null)

