const express = require('express');  
const http = require('http');  
const socketIo = require('socket.io');  
const path = require('path');  

const app = express();  
const server = http.createServer(app);  
const io = socketIo(server);  
app.set('view engine', 'ejs');  
//app.set('views', path.join(__dirname, 'views'));
// Serve static files from the public directory  
app.use(express.static(path.join(__dirname, 'public')));  
app.get('/', (req, res) => {  
    res.render('index'); // This should render views/index.ejs  
});
// Handle socket connections  
io.on('connection', (socket) => {  
    console.log('A user connected');  

    // Listen for location updates  
    socket.on('send-location', function(data){
        io.emit("receive-location" , {id : socket.id, ...data});
    });  

    // Handle disconnection  
    socket.on('disconnect', function(){
        io.emit('user-disconnected',socket.id)
    });  
});  

// Start the server  
const PORT = process.env.PORT || 3000;  
server.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  
