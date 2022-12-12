import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import { atom } from 'jotai'

export const mmSignerAtom = atom()
export const mmGameContractAtom = atom()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})
