import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
const MAX_SIZE = 3

export interface ModalState {
  open: boolean
  content: any
  children?: {
    open: boolean
    content: any
    children?: {
      open: boolean
      content: any
      children?: {
        open: boolean
        content: any
      }
    }
  }
}

const defaultModalNoChildren = {
  open: false,
  content: <></>,
}
const defaultModalOneChildren = {
  open: false,
  content: <></>,
  childrend: {
    open: false,
    content: <></>,
  },
}

const defaultModalTwoChildren = {
  open: false,
  content: <></>,
  childrend: {
    open: false,
    content: <></>,
    childrend: {
      open: false,
      content: <></>,
    },
  },
}

export const initialStateModal: ModalState = defaultModalNoChildren

export const snackbarSlice = createSlice({
  name: 'modal',
  initialState: initialStateModal,
  reducers: {
    setModal: (state, action: PayloadAction<ModalState>) => {
      state = action.payload
    },
  },
})

export const { setModal } = snackbarSlice.actions

export default snackbarSlice.reducer
