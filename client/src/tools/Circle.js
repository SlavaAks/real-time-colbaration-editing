import Tool from "./Tool";


export default class Circle extends Tool {
    constructor(canvas,socket, id) {
        super(canvas,socket, id);
        this.listen()
    }
    
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    

    mouseUpHandler(e) {
        this.mouseDown = false
        let curentX =  e.pageX-e.target.offsetLeft
            let curentY =  e.pageY-e.target.offsetTop
            let width = curentX-this.startX
            let height = curentY-this.startY
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                r: Math.sqrt(width**2 + height**2),
                color: this.ctx.fillStyle
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }
    // mouseMoveHandler(e) {
    //     if (this.mouseDown) {
    //         let currentX = e.pageX - e.target.offsetLeft;
    //         let currentY = e.pageY - e.target.offsetTop;
    //         this.width = currentX - this.startX;
    //         this.height = currentY - this.startY;
    //         this.draw(this.startX, this.startY, this.width, this.height)
    //     }
    // }
    // mouseDownHandler(e) {
    //     this.mouseDown = true
    //     let canvasData = this.canvas.toDataURL()
    //     this.ctx.beginPath()
    //     this.startX = e.pageX-e.target.offsetLeft
    //     this.startY = e.pageY-e.target.offsetTop
    //     this.saved = canvasData
    // }

    // mouseUpHandler(e) {
    //     this.mouseDown = false
    // }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            let curentX =  e.pageX-e.target.offsetLeft
            let curentY =  e.pageY-e.target.offsetTop
            let width = curentX-this.startX
            let height = curentY-this.startY
            let r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x,y,r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }.bind(this)
    }

    static staticDraw(ctx, x, y, r,color) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fill()
        ctx.stroke()
        
    }
}
