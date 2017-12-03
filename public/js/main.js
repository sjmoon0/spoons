var domainAddress = "moonman.website";
function createPieChart(ia,lab) {
  var temp=[];
  var sum=0;
  var sum2=0;
  var i=0;
  for(i=0;i<ia.length;i++){
    sum+=ia[i];
  }
  for(i=0;i<ia.length;i++){
    if(i==ia.length-1){
      temp[temp.length]=(360-sum2);
    }
    else{
      temp[temp.length]=(Math.floor(360*(ia[i]/sum)));
      sum2+=temp[temp.length-1];
    }
  }
  var pieChart = new PieChart( "piechart",
    {
      includeLabels: true,
      data: temp,
      labels: lab,
      colors: [
              ["#D50000", "#D50000"],//red
              ["#6CFF01", "#6CFF01"]
      ]
    }
  );
  pieChart.draw();
}

var socket = io.connect();
var listRefreshTimer;
var roomName='';
var tog=true;
//~~~~~~~~~~~~~~~~~~~~~~jQuery~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(document).ready(function(){
  goToState('a');
  $("#a_use_as_mobile").hide();
  $("#e_notify").modal('hide');

  $('#a_view_rooms').click(function(){
    goToState('c');
    socket.emit('get room list');
  });
  $('#a_create_room').click(function(){
    goToState('b');
  });
  $("#a_adv_settings").click(function(){
    tog=!tog;
    if(tog){
      $("#a_use_as_mobile").hide();
      $("#a_adv_settings").html("Advanced Settings...");
    }
    else{
    $("#a_use_as_mobile").show();
      $("#a_adv_settings").html("Hide Settings...");
    }
  });
  $("#a_use_as_mobile").click(function(){
    window.location.replace("http://"+domainAddress+"/mobile");
  });
  $('#c_create_room').click(function(){
    goToState('b');
  });
  $('#b_create_room').click(function(){
    if(validateB()){
      var newRoom={
        name:$('#b_room_name').val(),
        capacity:12,
        accessibility:$('#b_access_choice input:radio:checked').val(),
        difficulty:$('#b_diff_choice input:radio:checked').val()
      }
      socket.emit('create room',newRoom);
    }
  });
  $('#c_room_login').click(function(){
    $('#c_turnModal').modal('show');
  });
  $('#d_join_instr').click(function(){
    $('#d_joinInstr').modal('show');
  });
  $('#c_joinRoom').click(function(){
    if(validateC()){
      socket.emit('view room',$('#c_room_name').val());
    }
  });
  $(document).on('click',".c_public_room_choice",function(){
    console.log("Bloody ell!");
    socket.emit('view room',$(this).val());
  });
});

function goToState(st){
  $('.state').hide();
  $('.'+st).show();
}

function validateB(){
  if($('#b_room_name').val()==''||$('#b_room_name').val()==null){
    $('#b_feedback').html('Please provide a room name');
    return false;
  }
  console.log("oh yah -->"+$('#b_access_choice input:radio:checked').val());
  if($('#b_access_choice input:radio:checked').val()==null){
    $('#b_feedback').html('Please select an accessibility option');
    return false;
  }
  if($('#b_diff_choice input:radio:checked').val()==null){
    $('#b_feedback').html('Please select an difficulty option');
    return false;
  }
  return true;
}

function validateC(){
  if($('#c_room_name').val()==''||$('#c_room_name').val()==null){
    $('#c_feedback').html('Please provide a room name');
    return false;
  }
  return true;
}

function refreshRoomList(rArray){
  if(rArray.length==0 || rArray==null){
    $('#c_room_list').html("<p>There are no rooms to display</p>");
  }
  else{
    $('#c_room_list').empty();
  }
  for(var i=0;i<rArray.length;++i){
    var tnum;
    if(rArray[i].players==0){
      tnum=0;
    }
    else{
      tnum=rArray[i].players.length;
    }
    $('#c_room_list').append('<tr><td><a href="#" id="c_rm_'+rArray[i].name+'" value="'+rArray[i].name+'">'+rArray[i].name+'</a></td><td>'+tnum+'/'+rArray[i].capacity+'</td><td><a id="c_bt_'+rArray[i].name+'"><button type="button" class="btn btn-success fill-width" aria-label="Left Align">Join<span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span></button></a></td></tr>');
    $('#c_rm_'+rArray[i].name).addClass("c_public_room_choice");
    $('#c_bt_'+rArray[i].name).addClass("c_public_room_choice");
    $('#c_rm_'+rArray[i].name).val(rArray[i].name);
    $('#c_bt_'+rArray[i].name).val(rArray[i].name);
  }
}

function refreshPlayerList(pArray){
  if(pArray.length==0 || pArray==null){
    $('#d_player_list').html("<p>There are no users in this room</p>");
  }
  else{
    $('#d_player_list').empty();
    $('#d_player_list').append("<thead><tr><th>Username</th><th>Ready?</th></tr></thead>");
  }
  for(var i=0;i<pArray.length;++i){
    var status;
    if(pArray[i].readyToPlay){
      status="<a style='color:green'>Yes</a>";
    }
    else{
      status="<a style='color:red'>No</a>";
    }
    $('#d_player_list').append("<thead><tr><th>"+pArray[i].name+"</th><th>"+status+"</th></tr></thead>");
  }
}

function drawSpoons(num){
  $("#emidm").html('');
  if(num<0){
    return;
  }
  for(var i=0;i<num;++i){
    if(i%2==0){
      $("#emidm").append('<img class="spoon" src="./resources/spoon.png">');
    }
    else if(i%2==1){
      $("#emidm").append('<img class="spoon" src="./resources/spoon1.png">');
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~Event Driven Networking~~~~~~~~~~~~~~~~
socket.on('test1', function (data) {
  console.log("Aw yeah in room:"+data);
});

socket.on('refresh room list',function(rArray){
  refreshRoomList(rArray);
});

socket.on('room already exists',function(){
  $('#b_feedback').html('A room already exists with that name. Please select another name.');
});

socket.on('room doesnt exist', function(){
  $('#c_feedback').html('Room doesn\'t exist');
});

socket.on('room at capacity',function(){
  $('#c_feedback').html('Room is at capacity');
});

socket.on('room created',function(roomInfo){
  console.log("Viewing room: "+roomInfo.name);
  goToState('d');
  var ia=[1];
  var lab=["No Players Ready", "ready"];
  createPieChart(ia,lab);
  $('#d_room_name').html(roomInfo.name);
  roomName=roomInfo.name;
  if(roomInfo.players==null||roomInfo.players.length==0){
    refreshPlayerList([]);
  }
  else{
    refreshPlayerList(roomInfo.players);
  }
});

socket.on('first login success',function(roomInfo){
  refreshPlayerList(roomInfo.players);
});

socket.on('subsequent login success',function(roomInfo){
  //alert("another person logged in");
  var readyToPlay=0;
  for(var i=0;i<roomInfo.players.length;++i){
    if(roomInfo.players[i].readyToPlay){
      readyToPlay++;
    }
  }
  var ia=[roomInfo.players.length-readyToPlay,readyToPlay];
  var lab=["Not ready", "Ready"];
  createPieChart(ia,lab);
  refreshPlayerList(roomInfo.players);
});

socket.on('player ready',function(roomInfo){
  $('#e_notify').modal('hide');//useful on game restart
  var readyToPlay=0;
  for(var i=0;i<roomInfo.players.length;++i){
    if(roomInfo.players[i].readyToPlay){
      readyToPlay++;
    }
  }
  var ia=[roomInfo.players.length-readyToPlay,readyToPlay];
  var lab=["Not ready", "Ready"];
  createPieChart(ia,lab);
  refreshPlayerList(roomInfo.players);
});

socket.on('all players ready',function(roomInfo){
  goToState('e');
});

socket.on('update spoons', function(num){
  console.log(num+" spoons remaining");
  drawSpoons(num);
});

socket.on('game over', function(un){
  goToState('d');
  $('#e_notify').modal('show');
  $('#e_loserName').html(un);
});
