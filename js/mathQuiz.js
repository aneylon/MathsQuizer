var currentAnswer = "";
var totalCorrect = 0;
var totalWrong = 0;
var willAdd = true;
var willSub = false;
var willMulti = false;
var willDivide = false;

$(document).ready(function(){
	ShowButtonStates();
	UpdateCorrect();
	UpdateWrong();
	AskAQuestion();
	FlipButton();
});

function CheckAnswer(event){
	var enterAnswerKey = (event.which || event.keycode);
	if (enterAnswerKey == 13 && currentAnswer != null){
		var userEnteredAnswer = $("#userAnswer").val();
		console.log(userEnteredAnswer);
		if (userEnteredAnswer == currentAnswer){
			totalCorrect++;
			UpdateCorrect();
		} else {
			totalWrong++;
			UpdateWrong();
		}
		ClearAnswerField();
		AskAQuestion();
	}
}

function ShowMessage(){
	var message = "Please select at least one operator";
	alert(message);
}

function ClearAnswerField(){
	$("#userAnswer").val("");
}

function AskAQuestion(){
	var questionTypes = [];
	var myAnswer = 0;
	var operandOne = 0;
	var operandTwo = 0;

	if (willAdd)
		questionTypes.push("+");
	if(willSub)
		questionTypes.push("-");
	if(willMulti)
		questionTypes.push("*");
	if (willDivide)
		questionTypes.push("/");

	var myOperator = questionTypes[Math.floor((Math.random() * questionTypes.length))];

	operandOne = Math.floor(Math.random()*10)+1;
	operandTwo = Math.floor(Math.random()*10)+1;

	if (myOperator == "/") {
		myAnswer = operandOne * operandTwo;
		UpdateInterface(myAnswer,myOperator,operandOne,operandTwo);
		currentAnswer = operandTwo;
	} else if (myOperator == "+" || myOperator == "-" || myOperator == "*") {
		if (myOperator == "+")
			myAnswer = operandOne + operandTwo;
		if (myOperator == "-")
			myAnswer = operandOne - operandTwo;
		if (myOperator == "*")
			myAnswer = operandOne * operandTwo;
		UpdateInterface(operandOne,myOperator,operandTwo,myAnswer);
		currentAnswer = myAnswer;
	} else {
		myOperator = "";
		operandOne = 0;
		operandTwo = 0;
		myAnswer = null;
		currentAnswer = null;
		UpdateInterface(operandOne,myOperator,operandTwo,myAnswer);
		ShowMessage();
	}
}

function UpdateInterface(operandOne,operator,operandTwo,answer){
	$("#operandOne").text(operandOne);

	$("#operator").text(operator);

	$("#operandTwo").text(operandTwo);

	$("#theAnswer").text(answer);
}

function UpdateCorrect(){
	$("#correct").text(totalCorrect);
}

function UpdateWrong(){
	$("#incorrect").text(totalWrong);
}

function FlipButton(){
	$("#addition").click(function(){
		willAdd = !willAdd;
		UpdateButton(willAdd,"#addition");
	if(currentAnswer == null)
		AskAQuestion();
	});

	$("#subtraction").click(function(){
		willSub = !willSub;
		UpdateButton(willSub,"#subtraction");
	if(currentAnswer == null)
		AskAQuestion();
	});

	$("#multiplication").click(function(){
		willMulti = !willMulti;
		UpdateButton(willMulti,"#multiplication");
	if(currentAnswer == null)
		AskAQuestion();
	});

	$("#division").click(function(){
		willDivide = !willDivide;
		UpdateButton(willDivide,"#division");
	if(currentAnswer == null)
		AskAQuestion();
	});
}

function ShowButtonStates(){
	UpdateButton(willAdd,"#addition");
	UpdateButton(willSub,"#subtraction");
	UpdateButton(willMulti,"#multiplication");
	UpdateButton(willDivide,"#division");
}

function UpdateButton(value,selector){
	if (value) {
		$(selector).css("background-color","limegreen");
	} else {
		$(selector).css("background-color","orangered");
	}
}