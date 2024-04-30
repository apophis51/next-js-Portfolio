import {atom} from 'jotai'
import {RawJobData} from './workSearchTypes'


export const jobNameAtom = atom('')
export const UIDAtom = atom(1000)
export const UIDResumeAtom = atom(1000)
export const jobApplicationDataAtom = atom<RawJobData>({attributes:{}})
export const jobDescriptionAtom = atom('n/a')
export const JobApplicationsSent = atom(0)

export const userEmailAtom = atom('')

export const jobRejectionAtom = atom('n/a')
export const jobResumeAtom = atom('n/a')