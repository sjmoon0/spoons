var socket = io();
var currRoom='';
var userName='';
var tog=true;
var domainAddress="moonman.website";

function validate1(){
  if($('#m1_room_name').val()==''||$('#m1_room_name').val()==null){
    $('#m1_feedback').html('Please provide a room name');
    return false;
  }
  if($('#m1_user_name').val()==''||$('#m1_user_name').val()==null){
    $('#m1_feedback').html('Please provide a user name');
    return false;
  }
  return true;
}

function hideGrabButton(){
  $('#m4_grabbutton').hide();
  setTimeout(function(){
    $('#m4_grabbutton').show();
  },3000);
}

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
              ["#D50000", "#D50000"],
              ["#6CFF01", "#6CFF01"]
      ]
    }
  );
  pieChart.draw();
}
var c1e = document.getElementById('card1');
var card1 = new Hammer(c1e);
var c2e = document.getElementById('card2');
var card2 = new Hammer(c2e);
var c3e = document.getElementById('card3');
var card3 = new Hammer(c3e);
var c4e = document.getElementById('card4');
var card4 = new Hammer(c4e);
var ce = document.getElementById('center');
var center = new Hammer(ce);

$(document).ready(function(){
  goToState(1);
  $("#m1_use_as_desktop").hide();
  $('#m4_cardpile').hide();

  $(document).bind('touchmove', function(e) {
    e.preventDefault();
  });
  $("#adv_settings").click(function(){
    tog=!tog;
    if(tog){
      $("#m1_use_as_desktop").hide();
      $("#adv_settings").html("Advanced Settings...");
    }
    else{
    $("#m1_use_as_desktop").show();
      $("#adv_settings").html("Hide Settings...");
    }
  });
  $("#m1_use_as_desktop").click(function(){
    window.location.replace("http://"+domainAddress+"/desktop");
  });
  $("#m1_join_room").click(function(){
    if(validate1()){
      socket.emit('player login',{name:$('#m1_user_name').val(),rname:$('#m1_room_name').val()});
    }
  });

  $("#m2_instructions").click(function(){
    $("#m2_instructionsModal").modal('show');
  });
  $("#m3_instructions").click(function(){
    $("#m2_instructionsModal").modal('show');
  });

  $("#m3_play_game").click(function(){
    socket.emit('player clicked ready',{un:userName,rm:currRoom});
  });

  $("#m4_grabbutton").click(function(){
    var temp={
      rm:currRoom,
      un:userName
    }
    socket.emit('grab spoon', temp);
  });

  $("#m3_quitGame").click(function(){
    var temp={
      rm:currRoom,
      un:userName
    }
    socket.emit('custom disconnect',temp);
    socket.disconnect();
    goToState(0);
  });

  /*
  center.on("panleft panright panup pandown tap press",function(ev){
    ce.textContent = ev.type +" gesture detected.";
  });
  */
  center.on("swipeleft",function(){
    var temp={
      rm:currRoom,
      un:userName,
      card:$('#m4_cardholder').data('card')
    }
    socket.emit('pass left', temp);
    $('#m4_cardpile').hide();
  });

  card1.on("panstart",function(ev){
    var temp={
      rm:currRoom,
      un:userName,
      slot:0
    }
    socket.emit('discard',temp);
  });
  card2.on("panstart",function(ev){
    var temp={
      rm:currRoom,
      un:userName,
      slot:1
    }
    socket.emit('discard',temp);
  });
  card3.on("panstart",function(ev){
    var temp={
      rm:currRoom,
      un:userName,
      slot:2
    }
    socket.emit('discard',temp);
  });
  card4.on("panstart",function(ev){
    var temp={
      rm:currRoom,
      un:userName,
      slot:3
    }
    socket.emit('discard',temp);
  });
});

function goToState(st){
  $('.state').hide();
  $('.m'+st).show();
  if(st==4){
    card1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    card2.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    card3.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    card4.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    center.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  }
}

//~~~~~~~~~~~~~~~~~~~~Event Driven Networking~~~~~~~~~~~~~~~~

socket.on('test1', function (data) {
  console.log("Aw yeah in room:"+data);
  //socket.emit('my other event', { my: 'data' });
});

socket.on('room doesnt exist',function(){
  $('#m1_feedback').html('Room doesn\'t exist');
});

socket.on('room at capacity',function(){
  $('#m1_feedback').html('Room is at capacity');
});

socket.on('game already started',function(){
  $('#m1_feedback').html('The game has already started in this room!');
});

socket.on('username in use',function(){
  $('#m1_feedback').html('Username already in use. Please choose another.');
});

socket.on('first login success',function(roomInfo){
  goToState(2);
  var ia=[1];
  var lab=["No Players Ready", "Ready"];
  createPieChart(ia,lab);
});

socket.on('subsequent login success',function(roomInfo){
  goToState(3);
  var readyToPlay=0;
  for(var i=0;i<roomInfo.players.length;++i){
    if(roomInfo.players[i].readyToPlay){
      readyToPlay++;
    }
  }
  var ia=[roomInfo.players.length-readyToPlay,readyToPlay];
  var lab=["Not ready", "Ready"];
  createPieChart(ia,lab);
});

socket.on('register user',function(info){
  userName=info.name;
  currRoom=info.rname;
});

socket.on('indiv player ready',function(){
  $("#start_feedback").html("Waiting for other players to start...");
  $("#m3_play_game").hide();
});

socket.on('player ready',function(roomInfo){
  var readyToPlay=0;
  for(var i=0;i<roomInfo.players.length;++i){
    if(roomInfo.players[i].readyToPlay){
      readyToPlay++;
    }
  }
  var ia=[roomInfo.players.length-readyToPlay,readyToPlay];
  var lab=["Not ready", "Ready"];
  createPieChart(ia,lab);
});

socket.on('all players ready',function(roomInfo){
  goToState(4);
  $("#m2_instructionsModal").modal('hide');
  var temp={
    un:userName,
    rm:currRoom
  }
  socket.emit('get hand',temp);
});

socket.on('all viewers gone', function(){
  goToState(0);
  socket.disconnect();
});

socket.on('update hand', function(hand){
  var c1c,c1s,c1v;
  switch(hand[0].charAt(1)){
    case 'H': c1c='red';c1s='&hearts;';break;
    case 'D': c1c='red';c1s='&diams;';break;
    case 'C': c1c='black';c1s='&clubs;';break;
    case 'S': c1c='black';c1s='&spades;';break;
  }
  c1v=((hand[0].charAt(0)=='1')?'10':hand[0].charAt(0));
  var c2c,c2s,c2v;
  switch(hand[1].charAt(1)){
    case 'H': c2c='red';c2s='&hearts;';break;
    case 'D': c2c='red';c2s='&diams;';break;
    case 'C': c2c='black';c2s='&clubs;';break;
    case 'S': c2c='black';c2s='&spades;';break;
  }
  c2v=((hand[1].charAt(0)=='1')?'10':hand[1].charAt(0));
  var c3c,c3s,c3v;
  switch(hand[2].charAt(1)){
    case 'H': c3c='red';c3s='&hearts;';break;
    case 'D': c3c='red';c3s='&diams;';break;
    case 'C': c3c='black';c3s='&clubs;';break;
    case 'S': c3c='black';c3s='&spades;';break;
  }
  c3v=((hand[2].charAt(0)=='1')?'10':hand[2].charAt(0));
  var c4c,c4s,c4v;
  switch(hand[3].charAt(1)){
    case 'H': c4c='red';c4s='&hearts;';break;
    case 'D': c4c='red';c4s='&diams;';break;
    case 'C': c4c='black';c4s='&clubs;';break;
    case 'S': c4c='black';c4s='&spades;';break;
  }
  c4v=((hand[3].charAt(0)=='1')?'10':hand[3].charAt(0));

  $('#card1').html("<div class='incardslot' style='color:"+c1c+";'><p>"+c1v+"</p><p>"+c1s+"<p/></div>");
  $('#card2').html("<div class='incardslot' style='color:"+c2c+";'><p>"+c2v+"</p><p>"+c2s+"<p/></div>");
  $('#card3').html("<div class='incardslot' style='color:"+c3c+";'><p>"+c3v+"</p><p>"+c3s+"<p/></div>");
  $('#card4').html("<div class='incardslot' style='color:"+c4c+";'><p>"+c4v+"</p><p>"+c4s+"<p/></div>");
});

socket.on('display pile',function(){
  $('#m4_cardpile').show();
});

socket.on('set current card',function(card){
  var cc,cs,cv;
  if(card==''){
    $('#m4_cardholder').css('background-color','#b0c4de');
    $('#m4_cardholder').html("<div class='incardholder'><p></p><p><p/></div>");
  }
  else{
    $('#m4_cardholder').css('background-color','#FFFFFF');
    switch(card.charAt(1)){
      case 'H': cc='red';cs='&hearts;';break;
      case 'D': cc='red';cs='&diams;';break;
      case 'C': cc='black';cs='&clubs;';break;
      case 'S': cc='black';cs='&spades;';break;
    }
    cv=((card.charAt(0)=='1')?'10':card.charAt(0));
    $('#m4_cardholder').html("<div class='incardholder' style='color:"+cc+";'><p>"+cv+"</p><p>"+cs+"<p/></div>");
    $('#m4_cardholder').data("card",card);
  }
});

socket.on('display spoon',function(){
  goToState(5);
});

socket.on('invalid grab', function(){
  hideGrabButton();
});

socket.on('game over',function(un){
  $("#m3_play_game").show();
  $("#m3_prompt").modal('show');
  $('#m3_loserName').html(un);
});
