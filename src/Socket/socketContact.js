

function socket(io, admin){
    // nameCT,
    // phoneCT,
    // msgCT
    const db = admin.firestore()
    var Contact = db.collection("Contact")
    var thongbao = db.collection("TBCT")
    io.on('connection', function(socket){
           socket.on("contact", async function(dta){
                var list = []
                var count = 0
                const bath = db.batch()
                var snap = await Contact.get();
                for(var x of snap.docs){
                    if(count == parseInt(x.id)){
                        count++
                    }
                }
                var date = new Date();
                var thoigian = date.getDay() + "-" +date.getMonth() + "-" + date.getFullYear() + " Hours:  " + date.getHours()  + ":" +date.getMinutes()  + ":" +date.getMilliseconds()
                bath.set(Contact.doc(count.toString()), {Name : dta.nameCT, Phone : dta.phoneCT, Mesage : dta.msgCT, TimeGive : thoigian } )
                bath.commit()
                var snapagain = await Contact.get();
                list = snapagain.docs.map(ele => ({id : ele.id, ...ele.data()}))
                socket.emit("loadContact", list)
                socket.broadcast.emit('loadContact', list)
           })

           socket.on("loadContactUI", async function(data) {
               var list = []
               if(data == "true"){
                var snap = await Contact.get();
                 list = snap.docs.map(ele => ({id : ele.id, ...ele.data()}))
                
               }
                 socket.emit("loadContact-2", list)
                 socket.broadcast.emit('loadContact-2', list)
           })

           socket.on("deleteMsg", async function(data) {
                var snap = await Contact.get();
                for(var x of snap.docs){
                    if(data.id == parseInt(x.id)){
                       await Contact.doc(data.id.toString()).delete()  
                    }
                }
           })
      })
   
  
     
 }
 
  module.exports = socket