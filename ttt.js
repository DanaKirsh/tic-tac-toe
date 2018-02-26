var player = true;
var won = false;

/* Square is grey on hover if it can be occupied (i.e. free and game hasn't finished). */
$(document).ready(function() {
	$("td").hover(function() {
		if(!won && $(this).is(':empty')){
			$(this).css("background-color", "lightgrey");    
		}
	});
	$("td").mouseleave(function() {
		$(this).css("background-color", "white");
	});
});

/* Handles square click. */
function clicked(square) {
	// Make move if square is empty and game hasn't been won yet.
	if (!$(square).html() && !won) {
		$(square).text(player ? "X" : "O");
		$(square).css({"font-size": "80px" , "background-color": "white"});
		player = !player;
		checkWin();  
	}  
}

/* Checks whether a player has won. */
function checkWin() {
	checkRow();
	checkCol();
	checkDiagonal();
}

/* Checks whether any row is complete. */
function checkRow() {
	$('tr').each(function() {
		var cells = $(this).find("td");
		isWon(cells);
	});
}

/* Checks whether any column is complete. */
function checkCol() {
	for (var i = 0; i < 3; i++) {
		var cells = $("td.col" + i);
		isWon(cells);
	}
}

/* Checks whether any diagonal is complete. */
function checkDiagonal() {
	for (var i = 1; i < 3; i++) {
		var cells = $("td.diag" + i);
		isWon(cells);
	}
}

/* If game has been won, terminates game and announces winner. */
function isWon(cells) {
	if (cells[0].innerHTML !== "" && cells[0].innerHTML === cells[1].innerHTML
		 && cells[0].innerHTML === cells[2].innerHTML) {
		cells.css("color", "red");
		won = true;
	}
}

/* Starts a new game. */
function restart() {
	$("#ttt td").html("");
	$("td").css({"font-size" : "0px", "color" : "black"});
	player = true;
	won = false;
}
