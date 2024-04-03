import {atom} from 'jotai'

export const jobNameAtom = atom('')
export const UIDAtom = atom('')
export const jobApplicationDataAtom = atom({})
export const jobDescriptionAtom = atom('n/a')
export const JobApplicationsSent = atom(0)

export const userEmailAtom = atom('')

export const jobRejectionAtom = atom('n/a')