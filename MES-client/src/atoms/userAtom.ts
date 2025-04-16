import { atom } from 'jotai'

export const userAtom = atom(JSON.parse(localStorage.getItem('user')) || null)

