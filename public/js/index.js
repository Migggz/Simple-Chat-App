var active_rooms = $('#rooms');
var room = $('#newRoom');

active_rooms.on('change', function() {
    if (active_rooms[0].value === "") {
        room.removeAttr('disabled');
    } else {
        room.attr('disabled', 'disabled');
    }
});

room.on('input', function() {
    if (this.value.length === 0) {
        active_rooms.removeAttr('disabled', 'enabled');
    } else {
        active_rooms.attr('disabled', 'disabled');
    }
});

window.onload = $.ajax({
  dataType: "json",
  url: '/activerooms',
  success: function(data) {
    console.log(data);
    inject(data);
  }
});

function inject(activeRooms) {
    var rooms = $('#rooms');
    var chooseRoom = $('#chooseRoom');
    if ( activeRooms.length === 0 ) {
        rooms.attr('disabled', 'disabled');
        chooseRoom.text('There is no active rooms !');
    } else {
        for(let i = 0; i < activeRooms.length; i++) {
            rooms.append($('<option></option>').text(activeRooms[i]).attr('value', activeRooms[i]));
        }
    }
}
