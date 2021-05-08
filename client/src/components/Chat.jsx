import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from 'uuid';





const Chat = (props) => {    
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const [user_id, setId] = useState(uuidv4())
    const handleSendMessage = () => {
        if (msg) {console.log(messages);
            console.log(msg);
            props.socket.send(JSON.stringify({
                method: 'chat',
                user_id,
                name:localStorage.getItem('name'),
                second_name:localStorage.getItem('second_name'),
                msg
            }))
            setMsg('')
        }

    }

    useEffect(() => {
        props.socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    console.log(`пользователь ${localStorage.getItem('name')} ${localStorage.getItem('second_name')} присоединился`)
                    break
                case "chat":
                    console.log(msg.user_id);
                    console.log(msg.msg);
                    //if (msg.user_id != user_id) {
                        setMessages([...messages,
                        {
                            ms: msg.msg,
                            uid: msg.user_id,
                            name:msg.name,
                            second_name:msg.second_name
                        }])
                   // }
                    break
            }
        }
    })

    // socket.on('chat message', (data) => {
    //     const item = document.createElement('li')
    //     item.innerHTML = `<span>${data.name}</span>: ${data.message}`
    //     messages.appendChild(item)
    // })
    return (
        <div>
            <Container>
                <Grid container
                    justify={"center"}
                    style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                    <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
                        {messages.map(message =>
                            <div style={{
                                margin: 10,
                                border: user_id === message.uid ? '2px solid green' : '2px dashed red',
                                marginLeft: user_id === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5,
                            }}>
                                <Grid container>
                                    <div>{`${message.name} ${message.second_name}`}</div>
                                </Grid>
                                <div>{message.ms}</div>
                            </div>
                        )}
                    </div>
                    <Grid
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        style={{ width: '80%' }}
                    >
                        <form class="form">
                            <div class="name">{`${localStorage.getItem('name')} ${localStorage.getItem('second_name')}`}</div>
                            <input type="text" class="input" value={msg} onChange={(e) => { setMsg(e.target.value) }} autocomplete="off"></input>
                            <Button class="btn" onClick={handleSendMessage}>Отправить</Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
}
export default Chat;