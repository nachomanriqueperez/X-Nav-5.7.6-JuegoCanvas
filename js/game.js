// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var stone = {};
var monster={};
var monster1 = {};
var monster2 = {};
var monster3 = {};
var princessesCaught = 0;
var heroDeads = 0;
var stage =1;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	if (princessesCaught>1){
		stage =2;
	};

	if (stage ==1){
		// Throw the princess somewhere on the screen randomly
		princess.x = 32 + (Math.random() * (canvas.width - 90));
		princess.y = 32 + (Math.random() * (canvas.height - 98));
		// And the stones and monsters too
		solape = true;
		while (solape == true){

			   monster.x = 32 + (Math.random() * (canvas.width - 90));
			   monster.y = 32 + (Math.random() * (canvas.height - 98));
		       stone.x = 32 + (Math.random() * (canvas.width - 90));
			   stone.y = 32 + (Math.random() * (canvas.height - 98));
			   if (princess.x <= (stone.x + 16)
			   && stone.x <= (princess.x + 16)
			   && princess.y <= (stone.y + 16)
			   && stone.y <= (princess.y + 16)
			   && princess.x <= (monster.x + 16)
			   && monster.x <= (princess.x + 16)
			   && princess.y <= (monster.y + 16)
			   && monster.y <= (princess.y + 16)
		       && monster.x <= (stone.x + 16)
			   && stone.x <= (monster.x + 16)
			   && monster.y <= (stone.y + 16)
			   && stone.y <= (monster.y + 16)
			   ){
		           solape = true;
			   }else{
				   solape = false;
			   }
		}
	}else{
		// Throw the princess somewhere on the screen randomly
		princess.x = 32 + (Math.random() * (canvas.width - 90));
		princess.y = 32 + (Math.random() * (canvas.height - 98));
		// And the stones and monsters too
		solape = true;
		while (solape == true){

			   monster1.x = 32 + (Math.random() * (canvas.width - 90));
			   monster1.y = 32 + (Math.random() * (canvas.height - 98));
			   monster2.x = 32 + (Math.random() * (canvas.width - 90));
			   monster2.y = 32 + (Math.random() * (canvas.height - 98));
			   monster3.x = 32 + (Math.random() * (canvas.width - 90));
			   monster3.y = 32 + (Math.random() * (canvas.height - 98));
		       stone.x = 32 + (Math.random() * (canvas.width - 90));
			   stone.y = 32 + (Math.random() * (canvas.height - 98));
			   if (princess.x <= (stone.x + 16)
			   && stone.x <= (princess.x + 16)
			   && princess.y <= (stone.y + 16)
			   && stone.y <= (princess.y + 16)
			   && princess.x <= (monster.x + 16)
			   && monster1.x <= (princess.x + 16)
			   && princess.y <= (monster1.y + 16)
			   && monster1.y <= (princess.y + 16)
		       && monster1.x <= (stone.x + 16)
			   && stone.x <= (monster1.x + 16)
			   && monster1.y <= (stone.y + 16)
			   && stone.y <= (monster1.y + 16)
			   ){
		           solape = true;
			   }else{
				   solape = false;
			   }
		}
	};
	
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y>35) { // Player holding up
			hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y<410) { // Player holding down
			hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x>35) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x<445) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 32)
		&& princess.x <= (hero.x + 32)
		&& hero.y <= (princess.y + 32)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		
		reset();
	}
    //Are the hero touching a stone?
	

	//Is the hero dead?
	if (hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		heroDeads++;
		reset();
	}

	if (hero.x <= (monster1.x + 32)
		&& monster1.x <= (hero.x + 32)
		&& hero.y <= (monster1.y + 32)
		&& monster1.y <= (hero.y + 32)
	) {
		heroDeads++;
		reset();
	}

	if (hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		heroDeads++;
		reset();
	}

	if (hero.x <= (monster3.x + 32)
		&& monster3.x <= (hero.x + 32)
		&& hero.y <= (monster3.y + 32)
		&& monster3.y <= (hero.y + 32)
	) {
		heroDeads++;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady){
		ctx.drawImage(stoneImage, stone.x, stone.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster1.x, monster1.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster3.x, monster3.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught + " stage: " + stage + " dead:" + heroDeads, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
