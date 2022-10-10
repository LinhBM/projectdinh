import {
  Action,
  combineReducers,
  configureStore,
  createAction,
  getType,
  ThunkAction,
} from '@reduxjs/toolkit'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer, { initialStateAuth } from './authReducer'
import commonReducer, { initialStateCommon } from './commonReducer'
import intlReducer, { initialStateIntl } from './intlReducer'
import modalReducer, { initialStateModal } from './modalReducer'
import snackbarReducer, { initialStateSnackBar } from './snackbarReducer'

export const clearStoreAfterLogout = createAction('clearStoreAfterLogout')

const initialState = {
  auth: initialStateAuth,
  intl: initialStateIntl,
  snackbar: initialStateSnackBar,
  common: initialStateCommon,
  modal: initialStateModal,
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['video', 'live'],
}

function createRootReducer() {
  const reducers = combineReducers({
    auth: authReducer,
    intl: intlReducer,
    snackbar: snackbarReducer,
    common: commonReducer,
    modal: modalReducer,
  })

  return (state, action: any) => {
    if (state && action.type === getType(clearStoreAfterLogout)) {
      return reducers(initialState, action)
    }
    return reducers(state, action)
  }
}

const persistedReducer = persistReducer(persistConfig, createRootReducer())

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            'video/setPlayerVideo',
          ],
          ignoredPaths: [
            'videoPlayer.metadata.quality',
            'videoPlayer.player',
            'videoPlayer.quality',
          ],
        },
      }),
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

let persistor = persistStore(store)

export { store, persistor }
