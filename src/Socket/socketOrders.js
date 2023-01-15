
function socket(io, admin){
  const db = admin.firestore()
   var Notf = db.collection("Notification")
     
    io.on('connection', function(socket){
       console.log('Client connected ...')
       // client.on('joinn', function(data){
       //     console.log(data)
       // });
        socket.on('duyet', function(data){
          socket.emit("daduyet", data)
          socket.broadcast.emit('daduyet', data)
       }) 
      
      
      })
   
     
       io.on('connection', function(socket){
        socket.on('thongbaosp', async function(data){
          var arr = []
          var count = 0;
          if(data == "true"){
            var snap = await Notf.get();
            for(var doc of snap.docs){
                  if(count == parseInt(doc.id)){
                     count++
                  }
                 
             }
            
             const batch = db.batch();
             batch.set(Notf.doc(count.toString()), {Notify : "Bạn có 1 đơn hàng cần duyệt"})
              batch.commit()
             var public = []
              Notf.get().then(dta => {
               dta.forEach(dcm => {
                     arr.push(dcm.data())   
                     public = arr
                     console.log(arr)
               })
               if(arr.length >= 1){
                console.log("Dữ liệu in thong bao "+arr)
                socket.emit("duyetthongbao",arr)
                socket.broadcast.emit('duyetthongbao', arr)
              }else{
                console.log("Dữ liệu in thong bao "+0)
                socket.emit("duyetthongbao",0)
                socket.broadcast.emit('duyetthongbao', 0)
              }
            })      
          }
              else if(data == "false"){
                var snap = await Notf.get();
                 for(var doc of snap.docs){       
                   Notf.doc(doc.id.toString()).delete()         
             }
              Notf.get().then(dta => {
               dta.forEach(dcm => {
                     arr.push(dcm.data())   
               })
            //    if(arr.length >= 1){
                console.log("Dữ liệu in thong bao "+arr)
                socket.emit("duyetthongbao",{info : arr})
                socket.broadcast.emit('duyetthongbao',{info : arr})
              })
              // }else{
              //   console.log("Dữ liệu in thong bao "+0)
              //   socket.emit("duyetthongbao",0)
              //   socket.broadcast.emit('duyetthongbao', 0)
              }
              else if(data == "load"){
                Notf.get().then(dta => {
                  dta.forEach(dcm => {
                        arr.push(dcm.data())   
                  })
               //    if(arr.length >= 1){
                   console.log("Dữ liệu in thong bao "+arr)
                   socket.emit("duyetthongbao",arr)
                   socket.broadcast.emit('duyetthongbao',arr)
                 })
              }else if(data == "truee"){
                var snap = await Notf.get();
                for(var doc of snap.docs){
                      if(count == parseInt(doc.id)){
                         count++
                      }
                     
                 }    
                 const batch = db.batch();
                 batch.set(Notf.doc(count.toString()), {Notify : "Bạn có 1 thông báo liên hệ"})
                  batch.commit()
                 var public = []
                  Notf.get().then(dta => {
                   dta.forEach(dcm => {
                         arr.push(dcm.data())   
                         public = arr
                         console.log(arr)
                   })
                   if(arr.length >= 1){
                    console.log("Dữ liệu in thong bao "+arr)
                    socket.emit("duyetthongbao",arr)
                    socket.broadcast.emit('duyetthongbao', arr)
                  }else{
                    console.log("Dữ liệu in thong bao "+0)
                    socket.emit("duyetthongbao",0)
                    socket.broadcast.emit('duyetthongbao', 0)
                  }
                })  
              }
            } )
          })
    //       }
    //   })
    //  })
     
 }
 
 module.exports = socket