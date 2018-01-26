/***************************
SAVE GAME 	
***************************/
/*Load Game Function*/

//get the data
//clear the present board and data
//load the data into the game arrays and then 
//run it through the normal functions to create the board

/*Save function*/
function SaveGame(title,data){
	console.log(title,data);
	savegames.setItem(title,data).then(function (value) {
	  console.log('game saved');
	  messagefadeOut("Your Game was Saved",1000,"normal");//temp item
	}).catch(function(err) {
		// This code runs if there were any errors
		console.log(err);
	});
}
function GameSaveHelper(arr1){
	//recommend the date / time for the save title maybe a number based on existing records 
	var date = new Date();
	SaveGame(date,arr1);
}
/*Show Saved Games*/
function getSavedGames(){
	console.log("get the game data");
	var saveem = "";
	savegames.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    console.log([key, value]);
	  //console.log('game saved');
	  //messagefadeOut("Your Game was Saved",1000,"normal");//temp item
	  saveem += "<div class='ui-grid-a'><div class='ui-block-a'><a href='"+key+"' class='ui-btn ui-btn-mini'>Restore?</a></div><div class='ui-block-b'>"+key+"</div></div>";

	}).then( function(){
		$('.saved-games').html(saveem);		
	}).catch(function(err) {
		// This code runs if there were any errors
		console.log(err);
	});
}
/*Button to Save / Load*/
//need to get the array and create a title
$(".save").click(function(){
	console.log("Save");
	saveData = [[suitOne,suitTwo,suitThree,suitFour],startCard,flipAmount,[bottomdeck1,bottomdeck2,bottomdeck3,bottomdeck4],[line0,line1,line2,line3]];
	GameSaveHelper(saveData);
});

$(".load").click(function(){
	//make sure a saved one is selected - then 
	getSavedGames();
});
