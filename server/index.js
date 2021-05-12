const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')
const session= require('express-session')
const cookieParser=require('cookie-parser')
const { v4: uuidv4 } = require('uuid');
const db = require('./setting/db')
const UsersController = require('./Controller/UserController')
const bodyParser = require('body-parser')

const authMiddleware = require('./middleware/auth.middleware')
//const router = new Router()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

// app.get('/', (req,res)=>{
// res.sendFile(__dirname + '/index.html')
// })

app.use(express.static(__dirname + '../client/components'))
const passport = require('passport')
// io.on('connection', (socket)=>{
//     socket.on('chat message',(data)=>{
//         console.log("ss");
//         io.emit('chat message',{
//             message: data.message,
//             name: data.name
//         })
//     })
// })
app.use(
    session({
        secret:"secretcode",
        resave:true,
        saveUninitialized:true
    })
)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser("secretcode"))
// app.use(passport.initialize())
//app.use(session)
app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
            case "write":
                broadcastConnection(ws, msg)
                break
            case "message":
                broadcastConnection(ws, msg)
                break
            case "chat":
                broadcastConnection(ws, msg)
                break
        }
    })
})


app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json({ message: "Загружено" })
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})


app.post('/create_doc', (req, res) => {
    try {
        const uuid = uuidv4();

        fs.appendFile(path.resolve(__dirname, 'files', `${uuid}.txt`), '', () => { return res.status(200).json({ message: "Создан файл", uuid }) })
        //return res.status(200).json({message: "Загружено"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.post('/create_holst', (req, res) => {
    try {
        const uuid = uuidv4();

        fs.appendFile(path.resolve(__dirname, 'files', `${uuid}.jpg`), '', () => { return res.status(200).json({ message: "Создан файл", uuid }) })
        //return res.status(200).json({message: "Загружено"})
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    } ``
})

app.post('/html', (req, res) => {
    try {
        const data = req.body.txt
        console.log(data)
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.txt`), data)
        return res.status(200).json({ message: "Загружено" })
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    } ``
})
// passport.authenticate('jwt', { session: false })

app.get('/all_files', (req, res) => {
    try { 
        fs.readdir(`${__dirname}/files`, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            return res.status(200).json({ files })
            //listing all files using forEach
        })



    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.get('/html', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.txt`))
        const data = file.toString()
        res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.post('/registration',  UsersController.signup)
app.post('/login',  UsersController.signin)
app.get('/auth',authMiddleware,  UsersController.signauth)

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
