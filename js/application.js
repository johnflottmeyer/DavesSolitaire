/***********************************************
==============================================
Dave's Solitaire - My dad's favorite version of 
solitaire to play on Saturday mornings.


//maybe the card should be a card object and have a suit property and value property!
//then we can discern the value and suit by looking at the cards properties.
==============================================
*********************************************/

/*INITIALIZED VARIABLES*/
var suits = new Array("H","D","C","S");//suits
var startDeck = new Array("A","2","3","4","5","6","7","8","9","10","J","Q","K");//all possible cards
var shuffledDeck = [];
var startCard = [];
var line0 = [];
var line1 = [];
var line2 = [];
var line3 = [];
var suitOne = "";
var suitTwo = "";
var suitThree = "";
var suitFour = "";

/*HELPER FUNCTIONS*/
removeByIndex = function(arr,index) {
	arr.splice(index, 1);
};
function objectFindByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
function resetVariables(){
	//purge the variables here
}
function messagefadeOut(message,time,type){
	$(".message").removeClass("message-alert").removeClass("message-success");
	if(time === undefined){ time = 2000;}
	if(time != undefined){$(".message").addClass("message-"+type);}
	$(".message").html("").fadeIn();
	$(".message").html(message).fadeOut(time);
}
function createDeck(){
	var myDeck = new Array();//create the deck
	var myObDeck = new Array();
	for(i=0;i<suits.length;i++){
		for(j=0;j<startDeck.length;j++){
			myObDeck.push({"value":startDeck[j],"suit":suits[i],"placeholder":myObDeck.length}); 
			//store values as objects
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
  	//console.log(suitOne);
  	
  	removeByIndex(myObDeck,0);//now remove the first card from the array
  	//DISPLAY FIRST CARD IN THE LINE UP
  	$(".suit1 span").html("<div class='"+startCard.suit+"'>"+startCard.value+"</div>");
  	//console.log("startingCard: "+startCard);
  	var gutterCount = 0;
  	for(x=0;x<4;x++){//then build the columns on the right creating 4 groups of 4 cards
	  	window['gutter'+x] = [];
		for(y=0;y<4;y++){
			gutterCount ++;
			window['gutter'+x].push(myObDeck[gutterCount]);
			removeByIndex(myObDeck,gutterCount);
		}
		//console.log(window['gutter'+x]);
	}
	
  
	//console.log(myObDeck.length);
	//console.log("dealing hand: "+ myObDeck);
	//set up side decks
  	//compile lower dealing deck
  	//return myObDeck;
  	displayBottomDeck();
}
function displayBottomDeck(){
	for(z=0;z<4;z++){
		var inserthtml = "";
		var inactive = "";
		//console.log(window['gutter'+z].length);
		for(a=0;a<window['gutter'+z].length;a++){
			//console.log(window['gutter'+z][1].suit);
			if(a <= (window['gutter'+z].length)-2){inactive = "inactive";}else{inactive = "";}
			inserthtml += "<div class='card "+window['gutter'+a][z].suit+" "+inactive+"' id="+window['gutter'+z][a].value + ":" + window['gutter'+a][z].suit+">"+window['gutter'+z][a].value+"</div>";
		}
		$(".sidegroup" + (z+1)).html(inserthtml);
	}
	
}
function dealCards(array){
	//grab the start card and identify the suit
	
	//console.log("firstsuit" + suitOne);
	//console.log("lineOne" + line0);
	//removeByIndex(array,0);
	//then put the remaining into a hand at the bottom and show the first three cards
}
function checkCanPlace(value){
	var cardArr = [];
	cardArr = value.split(":");
	//lets compare it to the first deck.
	console.log("suitOne: " + suitOne + "-" + cardArr[1]); 
	if(cardArr[1] === suitOne){//if it matches the card in the first row move it up there.
		alert("match");
		//line0.push[];
	}else if(cardArr[0] === startCard.value){
		alert("start new row");
		//what line do we start
	}else if(cardArr[0] === "bleh"){//check to see if it can go in line 2
		
	}else if(cardArr[0] === "bleh"){//check to see if it can go in line 3
		
	}else if(cardArr[0] === "bleh"){//check to see if it can go in line 4
		
	}
	var cardvalue = cardArr[0];
	var cardsuit = cardArr[1];
	console.log(cardvalue + ":" + cardsuit);
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
    	checkCanPlace($(this).attr("id"),$(this).attr("class"));
		messagefadeOut(cardvalue,1000);
	}else{
		messagefadeOut("Sorry, that card is locked. Please try a different one.",3000,"alert");
	}
});
$(".deal").click(function(){
	shuffledDeck = createDeck();
	dealCards(shuffledDeck);
	/*Interface changes*/
	$(".deal").addClass('ui-state-disabled');
	$(".reset").removeClass('ui-state-disabled');
});
$(".reset").click(function(){
	resetVariables();
	console.log("Reset");
	/*Interface changes*/
	$(".deal").removeClass('ui-state-disabled');
	$(".reset").addClass('ui-state-disabled');
});
$(".save").click(function(){
	console.log("Save");
});
$(".load").click(function(){
	console.log("Load");
});