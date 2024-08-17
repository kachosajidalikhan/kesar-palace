import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage

// Your initial state and reducers
const initialRoomState = { rooms: [] };
const roomReducer = (state = initialRoomState, action) => {
  switch (action.type) {
    case 'ROOM_OK':
      return { ...state, rooms: [...state.rooms, action.room] };
    default:
      return state;
  }
};

const initialUserState = { currentUser: null, users: [] };
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'USER_LOGIN_OK':
      return { ...state, currentUser: action.user };
    case 'USER_LOGOUT':
      { localStorage.removeItem('myToken');
        state.currentUser = {}};
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((_, index) => index !== action.index),
      };
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  roomSection: roomReducer,
  userSection: userReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = createStore(persistedReducer);

// Create persistor
export const persistor = persistStore(store);
