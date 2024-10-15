import {createSlice} from '@reduxjs/toolkit'

const initialState={
    messages:[],
    currentUser: 'You',
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        sendMessage:(state,action)=>{
            state.messages.push({
                id:state.messages.length+1,
                text:action.payload.text,
                sender:state.currentUser,
                timeStamp:new Date().toISOString(),
            });
        },
        receiveMessage:(state,action)=>{
            state.messages.push(action.payload);
        }
    }
})

export const {sendMessage,receiveMessage} = chatSlice.actions;
export default chatSlice.reducer;