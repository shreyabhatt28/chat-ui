import { useEffect, useState,useRef } from "react";
import { sendMessage,receiveMessage } from "../features/chat/chatSlice";
import { useDispatch,useSelector } from "react-redux";
import {Box,TextField,Button,Typography,List,ListItem} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const Chat = () =>{
const msgEndRef = useRef();
const [input,setInput] = useState('');
const [disabled,setDisabled] = useState(true);
const messages= useSelector((state)=>state.chat.messages);
const dispatch = useDispatch();

useEffect(()=>{
setDisabled(input.trim()==='')

msgEndRef.current?.scrollIntoView({behavior:'smooth'});
},[messages,input]);

const handleSend= () =>{

    if(input.trim()!==''){
        dispatch(sendMessage({text:input}));
        setInput('');

        setTimeout(()=>{
            dispatch(receiveMessage({
                id:messages.length+2,
                text:'Hello,this is a simulated response.',
                sender:'Bot',
                timeStamp:new Date().toISOString(),
            }))
        },1000)
    }
        

}

return (
    <Box sx={{backgroundColor:'#ebe9e6',width: '100%', maxWidth: 600, margin: 'auto', padding: 1,marginTop:12,borderRadius:4}}>
    <Box sx={{height:'400px',overflowY:'auto',marginBottom:2,padding:2}}>
    <List>
        {messages.map((msg)=>{return(
            <ListItem key={msg.id}
            sx={{
                display: 'flex',
                justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
            }}>
            <Box sx={{display:'flex',flexDirection:'column'}}>
            <Box sx={{display:'flex',alignSelf:'flex-start',marginLeft:1,marginBottom:0.3}}>
            <Typography fontSize='9px' fontWeight="bold" sx={{color:'#7d7d7c'}}>
                {new Date(msg.timeStamp).toLocaleTimeString('en-IN',{
                    hour:'numeric',
                    minute:'numeric',
                    hour12:false,
                })}
                </Typography>
            </Box> 
            <Box
                sx={{
                backgroundColor: msg.sender === 'You' ? '#51AC57' : '#FCD765',
                borderRadius: msg.sender==='You'? '16px 16px 0 16px': '0 16px 16px 16px',
                padding: 1.5,
                maxWidth: '75%',
                wordWrap: 'break-word',
                }}
            >
                <Typography >
                {msg.text}
                </Typography>
            </Box>
            </Box>
            </ListItem>
        )})}
        <div ref={msgEndRef}></div>
    </List>
    </Box>
    <Box sx={{display:'flex',alignItems:'center',padding:3}}>
    <TextField
    fullWidth
    variant="outlined"
    color="first"
    label="type a message..."
    value={input}
    onChange={((e)=>setInput(e.target.value))}
    onKeyUp={(e)=>e.key==='Enter' && handleSend()}
    >
    </TextField>
    <Button disabled={disabled} variant="contained" color="first" onClick={handleSend} sx={{marginLeft:1,height:64,borderRadius:40,padding:0,}}><SendIcon fontSize="medium"/></Button>
    </Box>
    </Box>
)
}

export default Chat;