var sceneBackgroundUrls = [
	'../assets/backgrounds/landin_no.jpg',
	'../assets/scenes/scene-1.jpg',
	'../assets/transitions/time_travel.jpg',
	'../assets/scenes/back_from_travel.jpg'
];

var transitionUrls = [
	'../assets/transitions/time_travel.jpg',
];

var objects = [
	{
		id: 'hat-1',
		position: {
			x: '300px',
			y: '300px'
		}
	},
	{
		id: 'hat-2',
		position: {
			x: '400px',
			y: '300px'
		}
	},
	{
		id: 'hat-3',
		position: {
			x: '300px',
			y: '300px'
		}
	},
	{
		id: 'hat-4',
		position: {
			x: '200px',
			y: '300px'
		}
	}
];

//Tracks the options selected for each scene.
var matrix = [];

//Determines what to do with the selected options for each scene
var logic =  [];

//First Level
logic[0] = {
	0: objects[0],
	1: objects[1]
};

//Second Level
logic[1] = {
	0: objects[3],
	1: objects[2]
};

$(function() {
	console.log("Game ready!");

	setupScene0();
});

/**
 * positionBeginBtn
 */
function positionBeginBtn(){
	//maybe?
}

/**
 * gotoScene
 */
function gotoScene(sceneNum, bgImgUrl){
	var prevScene = 0;
	if(sceneNum > 0){
		prevScene = sceneNum - 1;
		//Turn off the old scene
		$('#scene-' + prevScene).addClass('hide');
	} else {
		$('#scene-' + prevScene).addClass('hide');
	}

	if(bgImgUrl){
		updateSceneBg(bgImgUrl);
	}

	//Setup the scene (buttons, etc.)
	setupScene(sceneNum);

	//Turn on the new scene
	$('#scene-' + sceneNum).removeClass('hide');
}

/**
 * updateSceneBg
 */
function updateSceneBg(imgUrl){
	console.log('Updating the background.');
	$(document.body).css({'background-image': 'url(' + imgUrl + ')'});
}

/**
 * changeBackgroundColor
 */
function changeBackgroundColor(hex){
	$(document.body).css({'background-image': 'url()'});
	$(document.body).css({'background-color': hex});
}

/**
 * setupScene
 */
function setupScene(num){
	switch(num){
		case 1:
			//scene 1
			setupScene1();
			break;

		case 2:
			//scene 2
			setupScene2();
			break;

		default:
			break;
	}
}

/**
 * beginTransition
 */
function beginTransition(num){
	if( num === 1) {
		return launchTransition1();
	}
}

/**
 * launchTransition1
 */
function launchTransition1(){
	return new Promise(function(resolve, reject){

		var delayStart = 0;
		var delayEnd = 0.75;
		TweenMax.delayedCall(delayStart, function(){
			console.log('Delay 1...');
			updateSceneBg(transitionUrls[0]);
		});
		TweenMax.delayedCall(delayStart + 0.1, function(){
			console.log('Delay 2...');
			changeBackgroundColor('#000000');
		});
		TweenMax.delayedCall(delayStart + 0.2, function(){
			console.log('Delay 3...');
			changeBackgroundColor('#FFFFFF');
		});
		TweenMax.delayedCall(delayStart + 0.3, function(){
			console.log('Delay 4...');
			updateSceneBg(transitionUrls[0]);
		});
		TweenMax.delayedCall(delayStart + 0.4, function(){
			console.log('Delay 2...');
			changeBackgroundColor('#000000');
		});
		TweenMax.delayedCall(delayStart + 0.5, function(){
			console.log('Delay 3...');
			changeBackgroundColor('#FFFFFF');
		});

		TweenMax.delayedCall(delayEnd, function(){
			//Return the promise
			console.log("Resolving the promise.");
			//This should be called on the last transition
			return resolve();
		});
	});
}


/**
 * SETUP SCENES
 */

/**
 * setupScene0
 */
function setupScene0(){
	$('#begin-btn-1').click(beginClicked);
}

/**
 * setupScene1
 */
function setupScene1(){
	console.log("Setting up scene 1.");

	$('#start-btn-1').show();

	$('#start-btn-1').click(function(){
		//Hide the start button
		$('#start-btn-1').hide();

		beginTransition(1).then(
			function(){
				//Resolved
				console.log('Transition finished!');
				//Transition into a scene
				gotoScene(2, sceneBackgroundUrls[2]);
			},
			function(){
				//Rejected
				console.log('Transition failed!');
			}
		);
	});
}

/**
 * setupScene2
 */
function setupScene2(){
	console.log("Setting up scene 2.");

	//Options
	$('#option-a').click(function(){
		console.log('Option A Clicked!');

		selectOption(0, 0);

	});
	$('#option-b').click(function(){
		console.log('Option B Clicked!');

		selectOption(0, 1);
	});

}

/**
 * setupScene3
 */
function setupScene3(){
	console.log("Setting up scene 3.");

	//Options
	$('#another-ride-btn').click(function(){
		console.log('Another ride!');
	});

}

/**
 * beginClicked
 */
function beginClicked(){
	console.log("Game started!");
	gotoScene(1, sceneBackgroundUrls[1]);
}

/**
 * selectOption
 */
function selectOption(level, val){
	//Figure out what to do with the initial scene now.
	//TODO: Add logic here
	matrix[level] = val;

	//Always go back to scene 3
	gotoScene(3, sceneBackgroundUrls[3]);

	applyObjectsToScene();
}

/**
 * applyObjectsToScene
 * Handles showing the objects selected thus far.
 */
function applyObjectsToScene(){
	for(var i = 0; i < matrix.length; i++){
		//Use jQuery to find the object and show it
		console.log(logic[i][matrix[i]].id);
		$('#' + logic[i][matrix[i]].id).removeClass('hide');
		$('#' + logic[i][matrix[i]].id).css({
			'margin-left': logic[i][matrix[i]].position.x,
			'margin-top': logic[i][matrix[i]].position.y
		});
	}
}
