const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

app.get('/activerooms', (req, res) => {
    var allUsers = users.users;
    var allRooms = (() => {
        var rooms = [];
        for (let i = 0; i < allUsers.length; i++) {
            rooms.push(allUsers[i].room);
        }
        
        return Array.from(new Set(rooms));
    })();
    res.send(allRooms);
});

io.on('connect', (socket) => {
    console.log('New User Connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are Required!');
        }
        // Case Insesitive
        params.room = params.room.toLowerCase();
        params.uniqueName = params.name.toLowerCase();

        socket.join(params.room);
        // Check if the username is exist or not, Case Insensitive!
        if (users.getUserList(params.room).uniqueNamesArray.filter((user) => user === params.uniqueName).length > 0) {
            return callback('Username is Already Exist!');
        }
        users.removeUser(socket.id); 
        users.addUser(socket.id, params.name, params.room, params.uniqueName);


        io.to(params.room).emit('updateUserList', users.getUserList(params.room).namesArray);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to The Chat App !'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} Has Joined ... !`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room).namesArray);
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has Left!`));
        }
    });

});

app.get('*', (req, res) => {
    res.redirect('/');
})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
});

//// Additional Features
// URL Case Insensitive (Done)
// Usernames Unique (Done)
// List of Currently Active Rooms