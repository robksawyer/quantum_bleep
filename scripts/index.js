var sceneBackgrounds = [
	'../assets/backgrounds/landin_no.jpg',
	'../assets/scenes/scene-1.jpg'
];


$(function() {
	console.log("Game ready!");

	$('#begin-btn-1').click(beginClicked);
});

/**
 * beginClicked
 */
function beginClicked(){
	console.log("Game started!");

	gotoScene(1, sceneBackgrounds[1]);
}

/**
 * positionBeginBtn
 */
function positionBeginBtn(){
	//maybe?
}

/**
 * gotoScene
 */
function gotoScene(sceneNum, bgImgPath){
	var prevScene = 0;
	if(sceneNum > 0){
		prevScene = sceneNum - 1;
		//Turn off the old scene
		$('#scene-' + prevScene).hide();
	}

	if(bgImgPath){
		updateSceneBg(bgImgPath);
	}

	//Turn on the new scene
	$('#scene-' + sceneNum).show();
}

/**
 * updateSceneBg
 */
function updateSceneBg(imgUrl){
	console.log('Updating the background.');
	$(document.body).css({'background-image': 'url(' + imgUrl+ ')'});
}
