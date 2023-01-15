var socket  = io.connect('http://localhost:3426')
socket.on('connection', function(data){
       socket.emit('joinn', "Hello server from client")
})