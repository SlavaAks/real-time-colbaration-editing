import React, {useEffect, useRef, useState} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

import  {Modal, Button} from "react-bootstrap";
import {useParams} from "react-router-dom"
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import axios from 'axios'

const Canvas = observer(() => {
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id:params.id,
                    username: localStorage.getItem('name'),
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                // console.log(figure.type)
                // console.log(figure.x)
                // console.log(figure.y)
                
                // console.log(figure.color)
                // console.log(figure.width)
                Brush.draw(ctx, figure.x, figure.y,figure.color,figure.width)
                break
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case "circle":
                
                Circle.staticDraw(ctx,figure.x,figure.y,figure.r,figure.color)
                break;
            case "finish":
                ctx.beginPath()
                break
        }
    }


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }



    return (
        <div className="canvas"> 
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;
