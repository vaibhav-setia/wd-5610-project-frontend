import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    login: false,
    accessToken: null,
    id: null,
    name: '',
    email: '',
    image_url: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInUser: (state, action) => {
            state.login = true;
            state.accessToken = action.payload.jwtToken;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image_url = action.payload.picture;
            return state;
        },
        logOutUser: (state, action) => {
            state.login = false;
            state.accessToken = null;
            state.id = null;
            state.name = '';
            state.email = '';
            state.image_url = '';
        }
    },
});

export const {logInUser, logOutUser} = userSlice.actions;

export const userLogin = state => state.user.login;
export const userToken = state => state.user.accessToken;
export const userName = state => state.user.name;
export const userEmail = state => state.user.email;
export const userImage = state => state.user.image;

export default userSlice.reducer;