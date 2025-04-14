import { atom } from 'jotai'

const countAtom = atom(localStorage.getItem('user') || null)

