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
            console.log('action.payload', action.payload);
            state.login = true;
            state.accessToken = action.payload.jwtToken;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image_url = action.payload.picture;
        
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

export const userLogin = state => state.login;
export const userToken = state => state.accessToken;
export const userName = state => state.name;
export const userEmail = state => state.email;
export const userImage = state => state.image;

export default userSlice.reducer;