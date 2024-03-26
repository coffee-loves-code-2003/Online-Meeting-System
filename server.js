const express=require('express');
const app=express();
const server=require('http').Server(app);
const { v4: uuidV4 } = require('uuid');

const {
    ExpressPeerServer
}=require('peer');
const peerServer=ExpressPeerServer(server,{
    debug:true
});
app.set('view engine','ejs');
app.use('/peerjs',peerServer);
app.use(express.static('public'));
const io=require('socket.io')(server)
app.get('/',(req,res)=>{
    res.redirect(`/${uuidV4()}`)} )

app.get('/:room',(req,res)=>
{
    res.render('room',{ roomId: req.params.room})
})

io.on('connection',socket =>
{
    
})
io.on('connection', (socket) => {
    // ...
    socket.on('join-room',(roomId,userid) =>
    {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected')
        socket.on('message', (data) => {
            io.to(roomId).emit('createMessage', data); 
          });
    })
   
  });
  




server.listen(5000);