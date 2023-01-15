function socket(io){
     
   io.on('connection', function(socket){
      // client.on('joinn', function(data){
      //     console.log(data)
      // });
       socket.on('shipment', function(data){
         socket.emit("hasData", data)
         socket.broadcast.emit('hasData', data)
      }) 
    
     
     })
  
    
      io.on('connection', function(socket){
      //   console.log('Client connected rồi...')
      //   // client.on('joinn', function(data){
      //   //     console.log(data)
      //   // });
      //      socket.on("hello", function(data){
      //       console.log("KKK làm được rồi "+data)
      //    })
    })
    
}

 module.exports = socket