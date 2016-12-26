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

function clicked(square) {
	if (!$(square).html() && !won) {
		$(square).text(player ? "X" : "O");
		$(square).css({"font-size": "80px" , "background-color": "white"});
		player = !player;
		checkWin();  
	}  
}

function checkWin() {
	checkRow();
	checkCol();
	checkDiagonal();
}

function checkRow() {
	$('tr').each(function() {
		var cells = $(this).find("td");
		isWon(cells);
	});
}

function checkCol() {
	for (var i = 0; i < 3; i++) {
		var cells = $("td.col" + i);
		isWon(cells);
	}
}

function checkDiagonal() {
	for (var i = 1; i < 3; i++) {
		var cells = $("td.diag" + i);
		isWon(cells);
	}
}

/* If game has been won, terminate game and announce winner. */
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
