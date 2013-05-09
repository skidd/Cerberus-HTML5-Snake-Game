//JavaScript Document
$(document).ready(function(){
	
	
	var menu = document.getElementById("mainMenu");
	var gameoverMenu = document.getElementById("gameoverMenu");
	var scoreStyle1 = document.getElementById("score1");
	var scoreStyle2 = document.getElementById("score2");
	var scoreFinal = document.getElementById("finalscore");
	var winnerSnake = document.getElementById("winner");
	//var timeStyle = document.getElementById("timecount");
	//var single = document.getElementById("single");
	gameoverMenu.style.zIndex = "-1";
	//timeStyle.style.zIndex="-1";
	//w = window.innerWidth,
		//h = window.innerHeight;
	var startTime = new Date();
	var mode = 0;
	
	var canvas = $('#snake')[0],
		ctx;
		
	//varibles of direction,food, score, and the array of the snake
	
	var di1;
	var di2;
	var food1;
	var food2;
	var score1=0;
	var score2=0;
	var snake1;
	var snake2;
	var cell = 40;
	var w = $("#snake").width();
	var h = $("#snake").height();
	var mid =w/cell/2;
			
	if(canvas.getContext){
		ctx= canvas.getContext("2d");
		

		$('#single').click(function(){
			mode = '1';
			init();
			
		});
		$('#multi').click(function(){
			mode = '2';
			init();
		});
		$('#backtoMenu').click(function(){
			gameoverMenu.style.zIndex="-1";
			menu.style.zIndex = "1";
			
		});
	
		
		
		function init(){
			//setInterval(function () {timeStyle.innerHTML = "ms since the start: " + (new Date() -startTime);}, 1000);
			menu.style.zIndex = "-1";
			gameoverMenu.style.zIndex="-1";
			scoreStyle2.style.zIndex="-1";
			score1=0;
			score2=0;
			//restartMenu.style.zIndex = "-1";
			di1= "right";
			scoreStyle1.innerHTML = "Score:"+score1;
			if(mode == '2')
			{alert("Press Enter to Start");
			di2= "right";
			scoreStyle2.style.zIndex="1";
			scoreStyle2.innerHTML = "Score:"+score2;}
			createSnake();
			createFood();
				
			//startMenu();
			
			
			if(typeof game_loop!="undefined"){
				 clearInterval(game_loop);
				}
			 game_loop = setInterval(paint,80);
			}
			
		
	
		function createSnake(){
			var length1 = 5;
			var length2 = 5; 
			snake1 = [ ]; 
			snake2 = [ ];
			
			for(var i = length1-1; i>=0; i--){			
				snake1.push({x:i, y:0});
				}
			
				
			if(mode==2){
				
				var startp= length2+mid;
				for(var j = startp-1; j>=mid; j--){			
				snake2.push({x:j, y:0});}//potential error	
				}
			}
		
		function createFood() {
			if(mode==1){
				food1 = {
					x: Math.round(Math.random()*(w-cell)/cell),
					y: Math.round(Math.random()*(h-cell)/cell),
					};
				}
				
			if(mode ==2){
				food1 = {
					x: Math.round(Math.random()*(w-cell)/2/cell),
					y: Math.round(Math.random()*(h-cell)/cell),
					};
					
				food2 = {
					x: Math.round(Math.random()*(w-cell)/2/cell)+mid,
					y: Math.round(Math.random()*(h-cell)/cell),
					};
				}
			}
			
		
		function paint(){
			
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, w, h);
			ctx.strokeStyle = "white";
			ctx.strokeRect(0, 0, w, h);
			
			
			
			
			var nx1 = snake1[0].x;
			var ny1 = snake1[0].y;
			if(di1 == "right") nx1++;
			else if(di1 == "left") nx1--;
			else if(di1 == "up") ny1--;
			else if(di1 == "down") ny1++;
			
			if(mode ==2){
				paint_wall();
				var nx2 = snake2[0].x;   //could wrong
				var ny2 = snake2[0].y;
				if(di2 == "right") nx2++;
				else if(di2 == "left") nx2--;
				else if(di2 == "up") ny2--;
				else if(di2 == "down") ny2++;
			}
				
			
			
			
			if(mode==1){
				if(nx1 == -1 || ny1 == -1 || nx1 == w/cell || ny1 == h/cell  || check_collision(nx1, ny1, snake1)){
					alert("Dead.Score:"+score1);
					winnerSnake.innerHTML = "";
					scoreFinal.innerHTML = "Final Score:"+score1;
					clearInterval(game_loop);
					gameoverMenu.style.zIndex = "1";
					
							
					return;
					}
				}
					
			else if(mode==2){
				if(nx1 == -1 || ny1 == -1|| nx1 == mid ||nx1 == w/cell || ny1 == h/cell || check_collision(nx1, ny1, snake1)){
					alert("Player1 Dead.Player1 Score:"+score1+" Player2 Score:"+score2);
					clearInterval(game_loop);
					scoreFinal.innerHTML = "Final Score: Snake1:"+score1+" Snake2:"+score2;
					winner(1);
					gameoverMenu.style.zIndex = "1";			
					return;
					}
				else if(nx2 == -1 || ny2 == -1 || nx2 == mid-1  ||nx2 == w/cell || ny2 == h/cell || check_collision(nx2, ny2, snake2)){
					alert("Player2 Dead.Player1 Score:"+score1+" Player2 Score:"+score2);
					clearInterval(game_loop);
					winner(2);
					scoreFinal.innerHTML = "Final Score: Snake1:"+score1+" Snake2:"+score2;
					gameoverMenu.style.zIndex = "1";
								
					return;
		
					}
								}
			
			
			if(mode==1){
				if(nx1 == food1.x && ny1 == food1.y){
					var tail = {x: nx1, y: ny1};
					score1=score1+5;
					scoreStyle1.innerHTML = "Score:"+score1;
					createFood();
					}
				else{
					var tail = snake1.pop(); 
					tail.x = nx1; tail.y = ny1;
					}
					snake1.unshift(tail); 
				}
				
			else if(mode==2){
				
				if(nx1 == food1.x && ny1 == food1.y||nx1 ==food2.x && ny1==food2.y){
					var tail = {x: nx1, y: ny1};
					score1=score1+5;
					scoreStyle1.innerHTML = "Score:"+score1;
					createFood();
					}
					
				else if(nx2 == food1.x && ny2 == food1.y||nx2 ==food2.x && ny2==food2.y){
					var tail2 = {x: nx2, y: ny2};
					score2=score2+5;
					scoreStyle2.innerHTML = "Score:"+score2;
					createFood();
					}
					
				else{
					if(nx1!=null&&ny1!=null){
						var tail = snake1.pop();
					 	tail.x = nx1; tail.y = ny1;
						}
					
					if(nx2!=null&&ny2!=null){
						var tail2 = snake2.pop();
						tail2.x = nx2; tail2.y = ny2;
						}
					}
					if(tail!=null){
					snake1.unshift(tail);}
					if(tail2!=null){ 
					snake2.unshift(tail2);}
				}	
			
			
			for(var i = 0; i < snake1.length; i++){
				var c = snake1[i];
				paint_cell(c.x, c.y);
				}
				
			paint_cell(food1.x, food1.y);
			
			if(mode==2){
				for(var j = 0; j < snake2.length; j++){
					var d = snake2[j];
					paint_cell(d.x, d.y);
					}
				paint_cell(food2.x, food2.y);
				}
			}
			
		
		
		function paint_cell(x, y){
			ctx.fillStyle = "white";
			ctx.strokeStyle = "black";
			ctx.fillRect(x*cell, y*cell, cell, cell);
			ctx.strokeRect(x*cell, y*cell, cell, cell);
			}
			
		function paint_wall()
		{
			ctx.fillStyle = "white";
			ctx.fillRect(w/2,0,1,h);
			
		}
		
		function check_collision(x, y, array){
		
			for(var i = 0; i < array.length; i++){
				if(array[i].x == x && array[i].y == y)
				 return true;
				 }
				 
			return false;
		}
		function winner(x){
			if(score1==score2){
				if(x==1) winnerSnake.innerHTML = "Winner:Snake2";
				else  winnerSnake.innerHTML = "Winner:Snake2";
			}
			else if(score1>score2) winnerSnake.innerHTML = "Winner:Snake1";
			else winnerSnake.innerHTML = "Winner:Snake2";
		}
		
	
		
		
		
		//keyboard
		$(document).keydown(function(e){
			var key = e.which;
			//a-z 65-90 l-arrow:37 up-38 right-39 down-40 a-65 w-87  d-68 s-83
			if(mode==1){
				if(key == "65" && di1 != "right") di1 = "left";
				else if(key == "87" && di1 != "down") di1 = "up";
				else if(key == "68" && di1 != "left") di1 = "right";
				else if(key == "83" && di1 != "up") di1 = "down";	
				else if(key == "37" && di1 != "right") di1 = "left";
				else if(key == "38" && di1 != "down") di1 = "up";
				else if(key == "39" && di1 != "left") di1 = "right";
				else if(key == "40" && di1 != "up") di1 = "down";
			}
			else if(mode==2){
				if(key == "65" && di1 != "right") di1 = "left";
				else if(key == "87" && di1 != "down") di1 = "up";
				else if(key == "68" && di1 != "left") di1 = "right";
				else if(key == "83" && di1 != "up") di1 = "down";	
				
				else if(key == "37" && di2 != "right") di2 = "left";
				else if(key == "38" && di2 != "down") di2 = "up";
				else if(key == "39" && di2 != "left") di2 = "right";
				else if(key == "40" && di2 != "up") di2 = "down";
			}
			
				
		})
		
	
	
				
	}
	
	else{
		alert('Canvas is not supported in your browser.');
	}
	
})