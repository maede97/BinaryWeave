/*
 * Copyright 2020 Matthias Busenhart
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var input = $("#input-text"); // text input
var sliderColumns = $("#input-jaquard"); // jaquard columns
var sliderRapport = $("#input-rapport");
var sliderSize = $("#input-size");

var countCharacters = 8; // how many bits are used

var currentDisplay;

var canvas;

var SIZE = 15; // SIZE OF A RECT, initial value
var MAX_WIDTH=10; // WIDTH OF CANVAS


input.on('input', function(e) {
	drawInput();
});

sliderSize.on("input", function(e) {
	$("addon-size-label").text(sliderSize.val());
	SIZE = sliderSize.val();
	drawInput();
}

sliderColumns.on('input',function(e) {
	$("#addon-jaquard-label").text(sliderColumns.val());
	drawInput();
});

sliderRapport.on("input", function(e) {
	$("#addon-rapport-label").text(sliderRapport.val());
	drawInput();
});

function my_save() {
	saveCanvas(canvas, 'binaryweave', 'png');
}

function textToBin(text) {
	var bin = text.charCodeAt().toString(2);
	return Array(countCharacters-bin.length+1).join("0") + bin;
}

function setup() {
	canvas = createCanvas(10,10);

	currentDisplay = $("#current-display");
	
	// create div at correct position in html DOM
	canvas.parent('canvas-holder');
	
	noLoop(); // turn of loop

	// initialize drawing by a call
	drawInput();
}

function drawBits(c, x, y) {
	let bits = textToBin(c);
	for(let i = 0; i < bits.length; i++) {
		// draw rect for each bit
		if(bits.charAt(i) === "1"){
			// draw black
			fill(0);
		} else {
			// draw white
			fill(255);
		}
		rect(i * SIZE + x * SIZE * countCharacters, y * SIZE, SIZE, SIZE);
	}
}

function drawInput() {
	sliderColumns.attr("max",input.val().length);
	resizeCanvas(sliderColumns.val() * SIZE * countCharacters * sliderRapport.val(), ceil(input.val().length / sliderColumns.val()) * SIZE, true);
	// draw the current input from var input;
	clear(); // clear current drawings
	currentDisplay.text("");

	let index = 0;
	let currentRow = 0;
	while(index < input.val().length) {
		let currLine = $("<p></p>");
		for(let i = 0; i < sliderColumns.val(); i++) {
			// draw horizontal
			currLine.text(currLine.text() + input.val().charAt(index));

			for(let j = 0; j < sliderRapport.val(); j++) {
				drawBits(input.val().charAt(index), i + j * sliderColumns.val(), currentRow);
			}
			index++;
		}
		currentDisplay.append(currLine);
		currentRow++;
	}
}

function draw() {}
