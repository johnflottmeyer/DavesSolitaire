/***********************************************
==============================================
Dave's Solitaire - My dad's favorite version of 
solitaire to play on Saturday mornings.


//maybe the card should be a card object and have a suit property and value property!
//then we can discern the value and suit by looking at the cards properties.

:::::::: set up array of moves to create an undo button. 
reverse functions then 
gameactions = [];
gameactions.push({action:"add to top deck",action:"remove from bottom deck"});

:::::::: Add some AI to the game
Check to see if the start card exists in the bottom decks and if it does make sure that the cards in front of them are not a matching suit. 

==============================================
*********************************************/

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    // Set AdMobAds options:
    admob.setOptions({
        publisherId:          "ca-app-pub-2038262597739639/6358184208",  // Required pub-2038262597739639
        interstitialAdId:     "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII",  // Optional
        tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
        tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
        tappxShare:           0.5                                        // Optional
    });
    admob.createBannerView();
}

document.addEventListener("deviceready", onDeviceReady, false);

$(document).on("pagecreate","#gameboard", function(){ 
    //$("#btnpopup").on("click", function(){
        $("#positionSelector").popup("open"); 
        
        //setTimeout(function(){  $("#p").popup("close"); }, 5000);
    //});
});
/*INITIALIZED VARIABLES*/
/*line start variables*/
var startCard = "";
//var secondCard = "";//maybe I don't need these three?
//var thirdCard = "";
//var fourthCard = "";
/*found cards*/
var line0 = [];
var line1 = [];
var line2 = [];
var line3 = [];
/*pick from here*/
var bottomdeck1 = [];
var bottomdeck2 = [];
var bottomdeck3 = [];
var bottomdeck4 = [];
var flipDeck = []; //bottom deal deck
/*identifier suits*/
var	suitOne = "";
var	suitTwo = "";
var	suitThree = "";
var	suitFour = "";
var myObDeck = new Array();//create the deck

/*HELPER FUNCTIONS*/
removeByIndex = function(arr,index) {//remove an item from teh array
	arr.splice(index, 1);
	//console.log(index + " removed from " + arr);
};
function getSuitIcon(x){//add in the icon css to bring in the card icons
	switch(x){
		case "D":
			return "icon-diamonds";
			break;
		case "H":
			return "icon-heart";
			break;
		case "S":
			return "icon-spades";
			break;
		case "C":
			return "icon-clubs";
			break;
		default:
			break;
	}
}
/*function myIndexOf(o,arr) {    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].x == o.x && arr[i].y == o.y) {
            return i;
        }
    }
    return -1;
}*/
/*Trying to find a proper search*/
function myIndexOf(a, obj) {
	console.log(a + " - " + obj);
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function getByValue(arr, value) {

  for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].name == value) //return arr[i];
    return true;
  }
}
//stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
function search(array, key, prop){
    // Optional, but fallback to key['name'] if not selected
    prop = (typeof prop === 'undefined') ? 'name' : prop;    

    for (var i=0; i < array.length; i++) {
        if (array[i][prop] === key) {
            //return array[i];
            return true;
        }else{
        	return false;
        }
    }
}
function getByValue(arr, value) {

  for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].name == value) return arr[i];
  }
}
/*******************************************
	How can I move this out to a function*/
	
function searchArray(searchvalue, key, v) {
	console.log("key: "+key + searchvalue.name + searchvalue);
	if (searchvalue.name == v){
		return true;
	}else{
		return false;
	}
}
/*******************************************/
function resetVariables(){
	
	//variables
	suitOne = "";
	suitTwo = "";
	suitThree = "";
	suitFour = "";
	startCard = "";
	//secondCard = "";
	//thirdCard = "";
	//fourthCard = "";
	bottomdeck1 = [];
	bottomdeck2 = [];
	bottomdeck3 = [];
	bottomdeck4 = [];
	line0 = [];
	line1 = [];
	line2 = [];
	line3 = [];
	//html interface
	$(".bottomgroup1").html("");
	$(".bottomgroup2").html("");
	$(".bottomgroup3").html("");
	$(".bottomgroup4").html("");
	$(".suit1 .deckcards").html("");
	$(".suit2 .deckcards").html("");
	$(".suit3 .deckcards").html("");
	$(".suit4 .deckcards").html("");
	$(".flip-deck").html("");
	$('.suit1 span').html("&nbsp;");
	$('.suit2 span').html("&nbsp;");
	$('.suit3 span').html("&nbsp;");
	$('.suit4 span').html("&nbsp;");
	window.myObDeck = [];
}
function messagefadeOut(message,time,type){ //feedback a message to the interface
	$(".message").removeClass("message-alert").removeClass("message-success");
	if(time === undefined){ time = 2000;}
	if(time != undefined){$(".message").addClass("message-"+type);}
	$(".message").html("").fadeIn();
	$(".message").html(message).fadeOut(time);
}
function card(value,name,suit){
	this.value = value;//original array 
	this.name = name;//face 
	this.suit = suit;//suit
}
function createDeck(){
	var suits = new Array("H","D","C","S");//suits
	var startDeck = new Array("A","2","3","4","5","6","7","8","9","10","J","Q","K");//all possible cards
	
	for(i=0;i<suits.length;i++){
		for(j=0;j<startDeck.length;j++){ 
			myObDeck.push(new card( myObDeck.length+1, startDeck[j], suits[i] ));
		}
	}
	var m = myObDeck.length, t, i;//now shuffle it using the Fisher-Yates
    while (m) {
    	i = Math.floor(Math.random() * m--);
		t = myObDeck[m];
		myObDeck[m] = myObDeck[i];
		myObDeck[i] = t;
  	}
  	startCard = myObDeck[0];//start building pick out first card
  	line0.push(startCard);
  	suitOne = startCard.suit;
  	removeByIndex(myObDeck,0);//now remove the first card from the array
  	//DISPLAY FIRST CARD IN THE LINE UP
  	var getStartIcon = getSuitIcon(startCard.suit);
  	$(".suit1 span").html("<div class='"+startCard.suit+"'><i class="+getStartIcon+"></i>"+startCard.name+"</div>");
  	var gutterCount = 0;
  	for(x=0;x<4;x++){//then build the columns on the right creating 4 groups of 4 cards
	  	window['bottomdeck'+x] = [];
		for(y=0;y<4;y++){
			gutterCount ++;
			window['bottomdeck'+x].push(myObDeck[gutterCount]);
			removeByIndex(myObDeck,gutterCount);
		}
	}
	flipDeck = myObDeck;
  	displayBottomDeck();
  	$("#positionSelector").popup("close");
}
function updateDeck(){
	displayBottomDeck();
	displayTopDeck();
}
function displayBottomDeck(){
	for(z=0;z<4;z++){
		var inserthtml = "";
		var inactive = "";
		for(a=0;a<window['bottomdeck'+z].length;a++){
			if(a <= (window['bottomdeck'+z].length)-2){inactive = "inactive";}else{inactive = "";}
			var suit = window['bottomdeck'+z][a].suit;
			var name = window['bottomdeck'+z][a].name;
			var place = window['bottomdeck'+z][a].value;
			iconsuit = getSuitIcon(suit);
			inserthtml += "<div class='card "+suit+" "+inactive+"' id="+ name + ":" + suit +":" + place + ":" + a + " title='bottomdeck"+z+"'><i class="+iconsuit+"></i><span>"+name+"</span></div>";
		}
		$(".bottomgroup" + (z+1)).html(inserthtml);
	}
	var flipcards = "";
	var counter = 1;
	for(e=0;e<window.flipDeck.length;e++){
		var getStartIcon = getSuitIcon(flipDeck[e].suit);
		if(e != flipDeck.length-1){ cardactive = "inactive"; } else{ cardactive = "";}
		if(e >= window.flipDeck.length-3){
			flipcards += "<div class='card card"+counter + " " + flipDeck[e].suit +" " + cardactive +"' id='"+ flipDeck[e].name + ":" + flipDeck[e].suit + ":" + flipDeck[e].value + ":" + e + "' title='flipDeck'><i class="+getStartIcon+"></i><span>" + flipDeck[e].name + "</span><br><small>"+counter+"</small></div>";
		}else{
			flipcards += "<div class='card card"+counter + " " + flipDeck[e].suit +" " + cardactive +" hiddencard' id='"+ flipDeck[e].name + ":" + flipDeck[e].suit + ":" + flipDeck[e].value + ":" + e + "' title='flipDeck'><i class="+getStartIcon+"></i><span>" + flipDeck[e].name + "</span><br><small>"+counter+"</small></div>";
		}
		if(counter === 3){counter = 1;}else{counter++;}
	}
	$('.flip-deck').html(flipcards);
}
function displayTopDeck(){
	console.log("go top deck");
	for(b=0;b<4;b++){
		var inserthtml = "";
		for(c=1;c<window['line'+b].length;c++){
			var suit = window['line'+b][c].suit;
			var name = window['line'+b][c].name;
			var place = window['line'+b][c].value;
			iconsuit = getSuitIcon(suit);
			inserthtml += "<div class='card "+suit+" inactive' id='"+c+"'><i class="+iconsuit+"></i><span>"+name+"</span></div>";
		}
		$("li.suit" + (b+1) + " div.deckcards").html(inserthtml);
	}
}
function dealCards(){
	
}
function flipThemCards(arr){
	var arrStart = 0;
	for(f=0;f<window.flipDeck.length;f++){
		if(f >= window.flipDeck.length - 3){
			fromIndex = f; //position from
			toIndex = arrStart; //position to
		    flipDeck.splice(toIndex, 0, flipDeck.splice(fromIndex, 1)[0]);
			arrStart++;
		}
	}
	displayBottomDeck();//refresh the deck 
}
function checkCanPlace(value,suit,title,deck,order){
	var position = deck; //original array position
	var origin = title; //which deck is it coming from
	var suit = suit; //what is its suit
	var value = value; //what is it's face value
	var place = order; //what is its order in the small deck that it is in so that we can remove it.
	if(suitOne === suit){//lets compare it to the start cards suit to see if it can go in the row.
		line0.push({"value":position,"name":value,"suit":suit});
		removeByIndex(window[origin],place);//remove from current location
		updateDeck();//refresh the deck
	}else if(value === startCard.name){ //let's see if it is a start card so that it can open up a new deck
		if(line1.length === 0){//row 2 start card
			line1.push({"value":position,"name":value,"suit":suit});
			suitTwo = suit;
			getStartIcon = getSuitIcon(suit);
			$(".suit2 span").html("<div class='"+suit+"'><i class="+getStartIcon+"></i>"+value+"</div>");
			removeByIndex(window[origin],place);
			displayBottomDeck();
		}else if(line2.length === 0){//row 3 start card
			line2.push({"value":position,"name":value,"suit":suit});
			suitThree = suit;
			getStartIcon = getSuitIcon(suit);
			$(".suit3 span").html("<div class='"+suit+"'><i class="+getStartIcon+"></i>"+value+"</div>");
			removeByIndex(window[origin],place);
			displayBottomDeck();
		}else if(line3.length === 0){//row 4 start card
			line3.push({"value":position,"name":value,"suit":suit});
			suitFour = suit;
			getStartIcon = getSuitIcon(suit);
			$(".suit4 span").html("<div class='"+suit+"'><i class="+getStartIcon+"></i>"+value+"</div>");
			removeByIndex(window[origin],place);
			displayBottomDeck();
		}
	}else if(suit === suitTwo){//check to see if it can go in line 2 - is it in the first row
	var inLineTest = getByValue(line0,value);
	if(inLineTest){
		console.log("its there");	line1.push({"value":position,"name":value,"suit":suit});
		removeByIndex(window[origin],place);//remove from current location
			updateDeck();
		}else{
		//console.log("not there");
		
	}

	}else if(suit === suitThree){//check to see if it can go in line 3 - is it in the second 
	var inLineTest = getByValue(line1,value);
	if(inLineTest){
	line2.push({"value":position,"name":value,"suit":suit});	removeByIndex(window[origin],place);
			updateDeck();
		}else{
			//console.log("not there");
	}
	}else if(suit === suitFour){//check to see if it can go in line 4 
	var inLineTest = getByValue(line2,value);
	if(inLineTest){
		//add to array
		line3.push({"value":position,"name":value,"suit":suit});
		removeByIndex(window[origin],place);//remove from current location
		updateDeck();
		}else{
		//console.log("not there");
		
	}

	}

}




//var shuffledDeck = createDeck();

/*CHECK FOR GAME KILLING LAYOUT*/
//search the side arrays for card value
//Scenario 1
//if that value is found and is behind the same suit then the game is over. 

/*DEAL GAME*/

/*SAVE GAME*/
//save the current status of the game - this should automattically happen if the game goes into background mode.
/*BUTTON CODE*/

////var result_obj = objectFindByKey(array, 'id', '45');

$('body').on('click', 'div.card', function() {
	if(!$(this).hasClass("inactive")){ //temp solution to detect if card can be clicked
    	var cardvalue = $(this).attr("id") + $(this).attr("class");
    	var cardname = $(this).attr("id");
    	var cardarray = []; //temp item
    	cardarray = cardname.split(":");
    	//console.log(cardarray);
    	checkCanPlace(cardarray[0],cardarray[1],$(this).attr("title"),cardarray[2],cardarray[3]);
		messagefadeOut(cardvalue,1000);//temp item
	}else{
		messagefadeOut("Sorry, that card is locked. Please try a different one.",3000,"alert");
	}
});

$(".flipem").click(function(){
	//alert("asdf");
	flipThemCards("flipDeck");
});

$(".deal").click(function(){
	var shuffledDeck = [];
	shuffledDeck = createDeck();
	dealCards(shuffledDeck);
	/*Interface changes*/
	$(".deal").addClass('ui-state-disabled');
	$(".reset").removeClass('ui-state-disabled');
	
});

$(".reset").click(function(){
	resetVariables();
	/*Interface changes*/
	$(".deal").removeClass('ui-state-disabled');
	$(".reset").addClass('ui-state-disabled');
	//close panel
	$("#mypanel").panel("close");
	//load start popup
	$("#positionSelector").popup("open");
	
});
$(".save").click(function(){
	console.log("Save");
});
$(".load").click(function(){
	console.log("Load");
});