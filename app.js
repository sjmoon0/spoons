
var express=require('express'),
	app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server),
	router = express.Router();

server.listen(3000);

app.get('/',function(req,res){
	var ua = req.headers['user-agent'].toLowerCase();
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) {
		
		res.sendFile(__dirname+'/mobile.html');
		console.log("Mobile session"+app.mountpath);
	}
	else{
		var fileName = req.params.name;
		res.sendFile(__dirname+'/index.html',function(err){
			if (err) {
			  console.log(err);
			  res.status(err.status).end();
			}
			else {
			  console.log('Sent:', fileName);
			}
		});
		console.log("Desktop session"+app.mountpath);
	}
});

/*
app.use(function(req, res, next) {
  //console.log('method: '+req.method);
  //console.log('url: '+req.url);
  //console.log('path: '+req.path);
	if(req.url!='/'){
		if(isValidRoom(req.url.substring(1,req.url.length))){
			//currRoom=req.url.substring(1,req.url.length);
			//console.log("Success: "+currRoom);
	  	}
	}
  	var ua = req.headers['user-agent'].toLowerCase();
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) {
		
		res.sendFile(__dirname+'/mobile.html');
		console.log("Mobile session"+app.mountpath);
	}
	else{
		var fileName = req.params.name;
		res.sendFile(__dirname+'/index.html',function(err){
			if (err) {
			  console.log(err);
			  res.status(err.status).end();
			}
			else {
			  console.log('Sent:', fileName);
			}
		});
		console.log("Desktop session"+app.mountpath);
	}
  //next();
});
*/

	var lobby={
			name:'lobby',
			capacity: 12
		}

	var rooms=[];
	var ta=[];

	function createPlayer(playerName){
		var tempplayer={
			name:playerName,
			readyToPlay:false,
			currentHand: ['AS','KH','QC','JD']
		}
		console.log("New player created: "+playerName);
		return tempplayer;
	}

	function isNameUsed(name,rname){
		for(var i=0;i<rooms.length;i++){
			if(rooms[i].name==rname){
				for(var j=0;j<rooms[i].players.length;j++){
					if(rooms[i].players[j].name==name){
						return true;
					}
				}
				return false;
			}
		}
		return false;
	}

	function addPlayerToRoom(playerInfo,roomName){
		var temproom=getRoomObject(roomName);
		if(temproom!=null&&temproom.players.length<temproom.capacity){
			temproom.players.push(playerInfo);
			console.log("player: "+playerInfo.name+" added to: "+roomName);
			return temproom;
		}
		else{
			console.log("Error when adding player to room. Room: "+roomName+" nonexistent");
			return null;
		}
	}

	function createRoom(roomInfo){
		var temproom={
			name:roomInfo.name,
			capacity:roomInfo.capacity,
			accessibility:roomInfo.accessibility,//true means public. false means private
			difficulty:roomInfo.difficulty,//implement later, perhaps
			players:0,
			viewers:1,
			gameStarted:false
		}
		console.log("New room created: "+roomInfo.name+" Access: "+roomInfo.accessibility+" Diff:"+roomInfo.difficulty);
		return temproom;
	}

	function isValidRoom(name){
		for(var i=0;i<rooms.length;i++){
			if(rooms[i].name==name&&rooms[i].players==0&&!rooms[i].gameStarted){
				rooms[i].players=[];
				return true;
			}
			else if(rooms[i].name==name && rooms[i].players.length<rooms[i].capacity&&!rooms[i].gameStarted){
				return true;
			}
		}
		return false;
	}

	function canView(name){
		for(var i=0;i<rooms.length;i++){
			if(rooms[i].name==name){
				return true;
			}
		}
		return false;
	}

	function getRoomObject(name){
		for(var i=0;i<rooms.length;i++){
			if(rooms[i].name==name){
				return rooms[i];
			}
		}
		return null;
	}
	
	function printRooms(){
		var s="";
		for(var i=0;i<rooms.length;i++){
			s+="| "+rooms[i].name+" |";
		}
		console.log(s);
	}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~Networking~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

io.on('connection',function(socket){
	console.log("holla:"+app.path());

	socket.join('lobby');
	console.log(socket.id+" in lobby");
	io.to('lobby').emit('test1',"lobby");
	
	socket.on('create room',function(roomInfo){
		socket.leave('lobby');
		rooms.push(createRoom(roomInfo));
		socket.join(roomInfo.name);
		printRooms();
		io.to(roomInfo.name).emit('room created',roomInfo);
	});
	
	socket.on('get room list',function(){
		io.to('lobby').emit('refresh room list',rooms);
	});

	socket.on('view room',function(roomInfo){
		if(!canView(roomInfo)){
			//fire event that makes user rechoose room
			console.log("Room either either not created or at capacity");
			return;
		}
		socket.leave('lobby');
		socket.join(roomInfo);
		var temproom=getRoomObject(roomInfo);
		temproom.viewers++;
		console.log("There are "+temproom.viewers+" viewers viewing the "+roomInfo+" room!");
		io.to(roomInfo).emit('room created',temproom);
	});

	socket.on('player login',function(info){
		if(!isValidRoom(info.rname)){
			//fire event that makes user rechoose room
			console.log("Room either either not created or at capacity");
			return;
		}
		if(isNameUsed(info.name,info.rname)){
			//fire event that makes user rechoose name
			console.log("Username already in use");
			return;
		}
		socket.emit('register user',info);
		//fire event that sends full username list to clients of given room
		var temproom=addPlayerToRoom(createPlayer(info.name),info.rname);
		console.log(temproom.players.length+" players in "+info.rname);
		socket.leave('lobby');
		socket.join(info.rname);
		if(temproom.players.length>1){
			io.to(info.rname).emit('subsequent login success',temproom);
		}
		else{
			//socket.emit('first login success',temproom);
			io.to(info.rname).emit('first login success',temproom);
		}
	});

	socket.on('player clicked ready',function(info){
		var temproom=getRoomObject(info.rm);
		var totalReady=0;
		if(temproom!=null){
			for(var i=0;i<temproom.players.length;++i){
				if(temproom.players[i].name==info.un){
					temproom.players[i].readyToPlay=true;
					socket.emit('indiv player ready');
					io.to(info.rm).emit('player ready',temproom);
				}
				if(temproom.players[i].readyToPlay){
					totalReady++;
				}
			}
			if(totalReady>=temproom.players.length){
				io.to(info.rm).emit('all players ready',temproom);
			}
		}
		else{
			console.log("error when user "+info.un+" clicked ready button.");
		}
	});

	//socket.on('disconnect',function(roomInfo){
	
	//}
});

console.log("Server Started");
 