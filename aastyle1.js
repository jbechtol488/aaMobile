$(document).ready(
	function() {
		aastyle1();
	});

// Global Variables

function aastyle1() {
	var _plusButtons = document.getElementsByClassName('plusButton'),
		_minusButtons = document.getElementsByClassName('minusButton'),
		i = 0;

	document.getElementById('minus1').onclick = function() 
	{
		var _value = document.getElementById('input1').value;
		if(_value >= 1) {document.getElementById('input1').value = parseInt(_value) - 1;
	}
		else 
			{
			 	console.log("Cannot be negative"); 
			}



	}
	document.getElementById('plus1').onclick = function() {
		var _value = document.getElementById('input1').value;
		if (_value === "") {
			document.getElementById('input1').value = 1;
		}else {
			document.getElementById('input1').value = parseInt(_value) + 1;
		}
		
	}



	document.getElementById('minus2').onclick = function() 
	{
		var _value = document.getElementById('input2').value;
		if(_value >= 1) {document.getElementById('input2').value = parseInt(_value) - 1;
	}
		else 
			{
			 	console.log("Cannot be negative"); 
			}



	}
	document.getElementById('plus2').onclick = function() {
		var _value = document.getElementById('input2').value;
		if (_value === "") {
			document.getElementById('input2').value = 1;
		}else {
			document.getElementById('input2').value = parseInt(_value) + 1;
		}
		
	}
}

function getParameterByName(itemValue)
{
  itemValue = itemValue.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + itemValue + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
