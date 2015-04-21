
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


app.use(function(req, res, next) {
  //console.log('method: '+req.method);
  //console.log('url: '+req.url);
  //console.log('path: '+req.path);
	if(req.url!='/'){
		var fileName = req.params.name;
		if(req.url.substring(1,req.url.length)=='mobile'){
			res.sendFile(__dirname+'/mobile.html',function(err){
				if (err) {
				  console.log(err);
				  res.status(err.status).end();
				}
				else {
				  console.log('Sent:', fileName);
				}
			});
	  	}
	  	else if(req.url.substring(1,req.url.length)=='desktop'){
	  		res.sendFile(__dirname+'/index.html',function(err){
				if (err) {
				  console.log(err);
				  res.status(err.status).end();
				}
				else {
				  console.log('Sent:', fileName);
				}
			});
	  	}
	  	else{
	  		res.sendFile(__dirname+'/index.html',function(err){
				if (err) {
				  console.log(err);
				  res.status(err.status).end();
				}
				else {
				  console.log('Sent:', fileName);
				}
			});
	  	}
	}
	/*
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
  */
	});


	var lobby={
			name:'lobby',
			capacity: 12
		}

	var rooms=[];
	//var ta=[];

	var deck=['AH','2H','3H','4H','5H','6H','7H','8H','9H','1H','JH','QH','KH',
			  'AC','2C','3C','4C','5C','6C','7C','8C','9C','1C','JC','QC','KC',
			  'AD','2D','3D','4D','5D','6D','7D','8D','9D','1D','JD','QD','KD',
			  'AS','2S','3S','4S','5S','6S','7S','8S','9S','1S','JS','QS','KS'];

	function createPlayer(playerName,pid){
		var tempplayer={
			name:playerName,
			readyToPlay:false,
			hand: ['AS','KH','QC','JD'],
			socketid:pid,
			hasSpoon:false,
			//sock:sh.s,
			cardPile:[],
			currCard:''
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
			viewers:[],
			gameStarted:false,
			goodToGrab:false,
			remainingSpoons:0,
			remDeck:[],
			discardPile:[]//The last player discards hid cards into this. Then when remDeck is empty, it gets set to shuffle(discardPile)
		}
		console.log("New room created: "+temproom.name+" Access: "+temproom.accessibility+" Diff:"+temproom.difficulty);
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
			if(rooms[i].name==name&&rooms[i].players==0){
				rooms[i].players=[];
			}
			if(rooms[i].name==name){
				return rooms[i];
			}
		}
		return null;
	}

	function atCapacity(name){
		for(var i=0;i<rooms.length;i++){
			if(!(rooms[i].players.length<rooms[i].capacity)){
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

	function printViewerIDs(room){
		var s=room.name+" viewers: ";
		for(var i=0;i<room.viewers.length;++i){
			s+="| "+room.viewers[i]+" |";
		}
		console.log(s);
	}

	function getRoomFromViewerID(vid){
		for(var i=0;i<rooms.length;++i){
			for(var j=0;j<rooms[i].viewers.length;++j){
				if(rooms[i].viewers[j]==vid){
					return rooms[i];
				}
			}
		}
		return null;
	}

	function removeViewer(rm,vid){
		for(var i=0;i<rm.viewers.length;++i){
			if(rm.viewers[i]==vid){
				rm.viewers.splice(i,1);
			}
		}
	}

	function removeRoom(rm){
		for(var i=0;i<rooms.length;++i){
			if(rooms[i].name==rm.name){
				rooms.splice(i,1);
			}
		}
	}

	function onlyPublicRooms(){
		var pr=[];
		for(var i=0;i<rooms.length;++i){
			if(rooms[i].accessibility=='true'){
				pr.push(rooms[i]);
			}
		}
		return pr;
	}

	function shuffle(cdeck0){
		var cdeck=cdeck0.slice();
		var currIndex=cdeck.length,temp,rand;
		while(0!==currIndex){
			rand=Math.floor(Math.random()*currIndex);
			currIndex-=1;
			temp=cdeck[currIndex];
			cdeck[currIndex]=cdeck[rand];
			cdeck[rand]=temp;
		}
		return cdeck;
	}

	function deal(rm,cdeck){
		//var rm=getRoomObject(roomName);
		for(var i=0; i<rm.players[0].hand.length;++i){
			for(var j=0;j<rm.players.length;++j){
				rm.players[j].hand[i]=cdeck.pop();
			}
		}
		return cdeck;//return remaining cards in deck
	}

/* Doesn't work for some reason
	function getPlayerFromID(rm,sid){
		for(var i=0;i<rm.players.length;++i){
			if(sid==rm.players[i].pid){
				return rm.players[i];
			}
		}
		return null;
	};
*/
	function getPlayerFromUN(rm,un){
		for(var i=0;i<rm.players.length;++i){
			if(un==rm.players[i].name){
				return rm.players[i];
			}
		}
		return null;
	}

	function isValidGrab(pl,rm){
		console.log("Grab attempt "+pl.hand[0].charAt(0)+''+pl.hand[1].charAt(0)+''+pl.hand[2].charAt(0)+''+pl.hand[3].charAt(0));
		return (pl.hand[0].charAt(0)==pl.hand[1].charAt(0)&&pl.hand[2].charAt(0)==pl.hand[3].charAt(0)&&pl.hand[0].charAt(0)==pl.hand[3].charAt(0))||rm.goodToGrab;
	};

	function getLoser(rm){
		for(var i=0;i<rm.players.length;++i){
			if(rm.players[i].hasSpoon==false){
				return rm.players[i];
			}
		}
	}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~Networking~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

io.on('connection',function(socket){
	console.log("holla:"+app.path());
	socket.join('lobby');
	console.log(socket.id+" in lobby");
	io.to('lobby').emit('test1',"lobby");
	
	socket.on('create room',function(roomInfo){
		var temproom=getRoomObject(roomInfo.name);
		if(temproom!=null){
			socket.emit('room already exists');
		}
		else{
			socket.leave('lobby');
			var temproom=createRoom(roomInfo);
			temproom.viewers.push(socket.id);
			rooms.push(temproom);
			socket.join(roomInfo.name);
			printRooms();
			//io.to(roomInfo.name).emit('room created',roomInfo);
			socket.emit('room created',roomInfo);
			io.to('lobby').emit('refresh room list',onlyPublicRooms());
		}
	});
	
	socket.on('get room list',function(){
		io.to('lobby').emit('refresh room list',onlyPublicRooms());
	});

	socket.on('view room',function(roomInfo){
		if(canView(roomInfo)==null){
			//fire event that makes user rechoose room
			console.log("Room does not exist");
			socket.emit('room doesnt exist');
			return;
		}
		socket.leave('lobby');
		socket.join(roomInfo);
		var temproom=getRoomObject(roomInfo);
		temproom.viewers.push(socket.id);
		console.log("There are "+temproom.viewers.length+" viewers viewing the "+roomInfo+" room!");
		printViewerIDs(temproom);
		io.to(roomInfo).emit('room created',temproom);
	});

	socket.on('player login',function(info){
		if(canView(info.rname)==null){
			socket.emit('room doesnt exist');
			return;
		}
		/*
		if(atCapacity(info.rname)){
			socket.emit('room at capacity');
			return;
		}
		*/
		if(getRoomObject(info.rname).gameStarted){
			socket.emit('game already started');
			return;
		}
		if(isNameUsed(info.name,info.rname)){
			//fire event that makes user rechoose name
			console.log("Username already in use");
			socket.emit('username in use');
			return;
		}
		socket.emit('register user',info);
		var temproom=addPlayerToRoom(createPlayer(info.name,socket.id),info.rname);
		console.log(temproom.players.length+" players in "+info.rname);
		io.to('lobby').emit('refresh room list',onlyPublicRooms());
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
			if(totalReady>=temproom.players.length){//THIS IS WHERE THE GAME ACTION STARTS!
				temproom.gameStarted=true;
				temproom.remDeck=deal(temproom,shuffle(deck));
				io.to(info.rm).emit('all players ready',temproom);
				temproom.remainingSpoons=temproom.players.length-1;
				io.to(info.rm).emit('update spoons',temproom.remainingSpoons);
				//emit update cardpile to player one. Or do something to just make the cardpile active
			}
		}
		else{
			console.log("error when user "+info.un+" clicked ready button.");
		}
	});

	socket.on('pass left',function(stuff){
		//called when player swiped middle section left
		var rm=getRoomObject(stuff.rm);
		var player=getPlayerFromUN(rm,stuff.un);
		console.log(stuff.un+" passed "+stuff.card+" left");
		if(stuff.card==''){ 
			if(rm.players.indexOf(player)==0){
				if(rm.remDeck.length==0){
					rm.remDeck=shuffle(rm.discardPile);
					rm.discardPile=[];
				}
				if(rm.remDeck.length>0){
					socket.emit('display pile');
					var nextcard=rm.remDeck.shift();
					player.currentCard=((nextcard==null)||(nextcard=='')?'':nextcard);

					socket.emit('set current card',player.currentCard);
				}
			}
			else if(player.cardPile.length>=0){
				var nextcard=player.cardPile.shift();
				player.currentCard=((nextcard==null)||(nextcard=='')?'':nextcard);

				socket.emit('set current card',player.currentCard);
			}
		}
		else{
			if(rm.players.indexOf(player)==0){
				if(rm.remDeck.length==0){
					rm.remDeck=shuffle(rm.discardPile);
					rm.discardPile=[];
				}
				if(rm.remDeck.length>=0){
					rm.players[1].cardPile.push(player.currentCard);
					io.sockets.connected[rm.players[1].socketid].emit('display pile');
					var nextcard=rm.remDeck.shift();
					player.currentCard=((nextcard==null)||(nextcard=='')?'':nextcard);

					socket.emit('set current card',player.currentCard);
					socket.emit('display pile');
				}
			}
			else{
				if(player.cardPile.length>=0){
					if(rm.players.indexOf(player)==(rm.players.length-1)){
						rm.discardPile.push(player.currentCard);
						console.log("Discarded: "+player.currentCard);
						var nextcard=player.cardPile.shift();
						player.currentCard=((nextcard==null)||(nextcard=='')?'':nextcard);

						socket.emit('set current card',player.currentCard);
					}
					else{
						rm.players[rm.players.indexOf(player)+1].cardPile.push(player.currentCard);
						io.sockets.connected[rm.players[rm.players.indexOf(player)+1].socketid].emit('display pile');
						var nextcard=player.cardPile.shift();
						player.currentCard=((nextcard==null)||(nextcard=='')?'':nextcard);

						socket.emit('set current card',player.currentCard);
					}
					if(player.cardPile.length>0){
						socket.emit('display pile');
					}
				}
			}
		}
	});

	socket.on('discard',function(stuff){
		//called when player swipes up on a card in his hand
		var rm=getRoomObject(stuff.rm);
		var player=getPlayerFromUN(rm,stuff.un);
		console.log(stuff.un+" discarded card at "+stuff.slot);
		if(player.currentCard!=''){
			if(rm.players.indexOf(player)==(rm.players.length-1)){
				rm.discardPile.push(player.hand[stuff.slot]);
				player.hand[stuff.slot]=player.currentCard;
				player.currentCard='';

			}
			else{
				rm.players[rm.players.indexOf(player)+1].cardPile.push(player.hand[stuff.slot]);
				io.sockets.connected[rm.players[rm.players.indexOf(player)+1].socketid].emit('display pile');
				player.hand[stuff.slot]=player.currentCard;
				player.currentCard='';
			}
			socket.emit('set current card',player.currentCard);
			socket.emit('update hand',player.hand);
		}
	});
	socket.on('get hand',function(rm){
		var cRoom=getRoomObject(rm.rm);
		var cPlayer=getPlayerFromUN(cRoom,rm.un);
		socket.emit('update hand',cPlayer.hand);
	});
	
	socket.on('grab spoon',function(stuff){
		var rm=getRoomObject(stuff.rm);
		var pl=getPlayerFromUN(rm,stuff.un);
		if(isValidGrab(pl,rm)){
			rm.goodToGrab=true;
			pl.hasSpoon=true;
			if(rm.remainingSpoons>0){
				rm.remainingSpoons--;
				socket.emit('display spoon');
				if(rm.remainingSpoons>=0){
					console.log(rm.remainingSpoons+" spoons remaining");
					io.to(rm.name).emit('update spoons',rm.remainingSpoons);
				}
				if(rm.remainingSpoons==0){
					rm.goodToGrab=false;
					console.log(getLoser(rm));
					io.to(rm.name).emit('game over',getLoser(rm).name);
				}
			}
			console.log(pl.name+" made a valid grab");
		}
		else{
			console.log(pl.name+" invalid grab");
			socket.emit('invalid grab');
		}
	});

	/*
	socket.on('',function(){
		
	});
	*/

	socket.on('disconnect',function(){
		console.log(socket.id+" disconnected");
		var affectedRoom=getRoomFromViewerID(socket.id);
		//console.log(io);
		//var affectedRoom=getRoomObject(io.sockets.connected[socket.id]);
		//console.log(socket.id+" disconnected from "+affectedRoom.name);
		if(affectedRoom!=null){
			removeViewer(affectedRoom,socket.id);
			if(affectedRoom.viewers.length<=0){
				console.log('disconnect everyone in '+affectedRoom.name+'!');
				io.to(affectedRoom.name).emit('all viewers gone');
				removeRoom(affectedRoom);
				io.to('lobby').emit('refresh room list',onlyPublicRooms());
			}
		}
	});

	socket.on('error', function(err){
		console.error(err.stack);
	});
});

console.log("Server Started");
 