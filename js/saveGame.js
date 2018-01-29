/***************************
SAVE GAME 	
***************************/
/*Load Game Function*/

//get the data
//clear the present board and data
//load the data into the game arrays and then 
//run it through the normal functions to create the board

/*Save function*/
//lets limit this to 3 slots to make it easier to manage size and look
function SaveGame(title,data){
	console.log(title,data);
	savegames.setItem(title,data).then(function (value) {
	  console.log('game saved');
	  window.messagefadeOut(".message","Your Game was Saved",1000,"normal");//temp item
	  $('#mypanel').trigger('updatelayout');
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
/*DeleteGame*/
function deleteSavedGame(id){
	savegames.removeItem(id).then(function() {
    // Run this code once the key has been removed.
    messagefadeOut(".message","Your Game was Removed",1000,"normal");//temp item
    
    console.log('Key is cleared!');
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});
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
	  messagefadeOut(".message","Your Game was Loaded",1000,"normal");//temp item
	  saveem += "<li class='divider-title' data-role='list-divider'><h4>"+key+"</h4></li><div data-role='controlgroup' data-type='horizontal' class='ui-group-theme-a'><a href='"+key+"' class='ui-btn ui-corner-all ui-icon-plus addProduct'>load</a><a href='"+key+"' class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon- removeProduct'>delete</a></div></li>";
	  //<li><a href='"+key+"' class='ui-btn ui-btn-mini'>Delete</a></li><li><a href='"+key+"' class='ui-btn ui-btn-mini'>Load</a></li><li>"+key+"</div></li>";

	}).then( function(){
		$('.loadlist').html(saveem);
		$('.loadlist').enhanceWithin(); //this will refresh the cart list. 
		$('.loadlist').listview("refresh"); //seems some issues with 		
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
