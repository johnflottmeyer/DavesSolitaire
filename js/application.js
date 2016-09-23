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
var startCard = "";
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
function resetVariables(){
	var shuffledDeck = [];
	var startCard = "";
	var line0 = [];
	var line1 = [];
	var line2 = [];
	var line3 = [];
	var suitOne = "";
	var suitTwo = "";
	var suitThree = "";
	var suitFour = "";
}
function createDeck(){
	var myDeck = new Array();//create the deck
	var myObDeck = new Array();
	for(i=0;i<suits.length;i++){
		for(j=0;j<startDeck.length;j++){
			myObDeck.push({"value":startDeck[j],"suit":suits[i]}); //store values as objects
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
  	console.log(suitOne);
  	
  	removeByIndex(myObDeck,0);//now remove the first card from the array
  	console.log("startingCard: "+startCard);
  	var gutterCount = 0;
  	for(x=0;x<4;x++){//then build the columns on the right creating 4 groups of 4 cards
	  	window['gutter'+x] = [];
		for(y=0;y<4;y++){
			gutterCount ++;
			window['gutter'+x].push(myObDeck[gutterCount]);
			removeByIndex(myObDeck,gutterCount);
		}
		console.log(window['gutter'+x]);
	}
	
  	//console.log("object:" + myObDeck[0].value + " : " + myObDeck[0].suit);
	//console.log(myObDeck.length);
	console.log(myObDeck.length);
	console.log("dealing hand: "+ myObDeck);
	//set up side decks
  	//compile lower dealing deck
  	return myObDeck;
}
function dealCards(array){
	//grab the start card and identify the suit
	
	//console.log("firstsuit" + suitOne);
	//console.log("lineOne" + line0);
	//removeByIndex(array,0);
	//then put the remaining into a hand at the bottom and show the first three cards
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
$(".deal").click(function(){
	shuffledDeck = createDeck();
	dealCards(shuffledDeck);
	$(".deal").addClass('ui-state-disabled');
	$(".reset").removeClass('ui-state-disabled');
	//console.log("n:"+ shuffledDeck);
	//disable the deal button
});
$(".reset").click(function(){
	resetVariables();
	$(".deal").removeClass('ui-state-disabled');
	$(".reset").addClass('ui-state-disabled');
});