	var len=1,score=0;
	var fup,fd,fl,fr=1;
	var snake = [ [60,60] ];
	var prevx=snake[0][0],prevy=snake[0][1];
	var food = [];
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	document.getElementById("sco").innerHTML = "SCORE : "+score;
	document.addEventListener("keydown",changedir);
	generatefood();
	var animation = setInterval(drawsnake, 100);
	
	function drawsnake() {
		console.table(snake);
	
		//-----------------------to check if food is collected------------------------
		let tempx=Math.abs(snake[0][0]-food[0][0]),tempy = Math.abs(snake[0][1]-food[0][1]);
		if((tempx==30&&tempy==0) || (tempx==0&&tempy==30)) {
			snake.unshift([food[0][0],food[0][1]]);
			food.pop();
			len++;
			score++;
			document.getElementById("sco").innerHTML = "SCORE : "+score;
			generatefood();
		}
		ctx.beginPath();
		ctx.clearRect(prevx, prevy, 30, 30);
		ctx.fillStyle = "white";
		console.log("drawing check");
		for(let i=0;i<len;i++ ) {
			ctx.fillRect(snake[i][0], snake[i][1], 30, 30);
			console.log(snake[i][0],snake[i][1]);
		}
		
		if(checkcollision()) {
			console.log(snake,"hit");
			clearInterval(animation);
			setTimeout( function endgame() {
					document.getElementById("canvas").style.display = "none";
					document.getElementById("over").style.display = "block";
				},500);
			return;
		}
		
		
		prevx = snake[len-1][0];
		prevy = snake[len-1][1];
		
		if(fup == 1 && snake[0][1] >0) {
			snake.unshift([snake[0][0],snake[0][1]-30]);
			snake.pop();
		}
		else if(fd == 1 && snake[0][1]+30<canvas.height) {
			snake.unshift([snake[0][0],snake[0][1]+30]);
			snake.pop();
		}
		else if(fr ==1 && snake[0][0]+30<canvas.width) {
			//console.log("right");
			//console.log(snake,"inright");
			snake.unshift([snake[0][0]+30,snake[0][1]]);
			snake.pop();
		}
		else if( fl == 1 && snake[0][0]>0) {
			snake.unshift([snake[0][0]-30,snake[0][1]]);
			snake.pop();
		}			

	}
	
	function changedir() {
		let tempx=Math.abs(snake[0][0]-food[0][0]),tempy = Math.abs(snake[0][1]-food[0][1]);
		if((tempx==30&&tempy==0) || (tempx==0&&tempy==30)){
			snake.unshift([food[0][0],food[0][1]]);
			food.pop();
			len++;
			score++;
			document.getElementById("sco").innerHTML = "SCORE : "+score;
			generatefood();
		}
 		ctx.clearRect(prevx,prevy,30,30);
 		prevx=snake[len-1][0];
 		prevy=snake[len-1][1];
 		ctx.clearRect(snake[0][0],snake[0][1],30,30);
   		if( event.key === "ArrowUp" && snake[0][1]>0 && fup!=1){
 			fup = 1;fd = fr = fl = 0;
			snake.unshift([snake[0][0],snake[0][1]-30]);
			snake.pop();
 		}
 		else if( event.key === "ArrowDown" && snake[0][1]+30<canvas.height && fd!=1) {
 			fd =1; fup=fr=fl=0
			snake.unshift([snake[0][0],snake[0][1]+30]);
			snake.pop();
 		}
 		else if(event.key === "ArrowRight" && snake[0][0]+30<canvas.width && fr!=1) {
 			fr=1; fd=fup=fl=0;
			snake.unshift([snake[0][0]+30,snake[0][1]]);
			snake.pop();
 		}
 		else if( event.key === "ArrowLeft" && snake[0][0] >0 && fl!=1) {
 			fl=1;fr=fup=fd=0;
			snake.unshift([snake[0][0]-30,snake[0][1]]);
			snake.pop();
 		}
 	}
	
	function drawfood() {
		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.fillRect(food[0][0], food[0][1], 30, 30);
	}
	
	function generatefood() {
		let x = Math.floor(Math.random()*(810-60)+60);
		let y = Math.floor(Math.random()*(540-30)+60);
		x -= x%30;
		y -= y%30;
		food.push([x,y]);
		drawfood();
	}
	
	function checkcollision() {
		if(snake[0][0]<=0 || snake[0][0]+30>=canvas.width || snake[0][1]<=0 || snake[0][1]+30>=canvas.height ) {
			return true;
		}
		for(let i=1;i<len;i++ ) {
			if(snake[i][0]==snake[0][0] && snake[i][1] == snake[0][1])
				return true;
		}
		return false;
	}
