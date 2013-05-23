$(document).ready(
	function() {
		initialize();
	});

window.products = [];

//query string parser
function parseUsersQuery(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}; //end parseUserQuery


//products and checkout page
function initialize()
{

	function productObjects()
	{
		//nested arrays of site product objects 
		window.products = [

			{ID: '1', Name: 'Medallions', // <-- adds product category to main product page. This is category #1 medallions.

				Type: // <-- adds different types of the category selected. Ex. aaStyle1 painted plated etc...
				[
					
					{ID: '1a', Name: 'aaStyle1', img: 'images/style1/Wend5b.jpg', ParentID: '1', DropDownSelection: true,

					Style:  // <-- product Styles Ex. aluminum colored bronze etc...
						[
							//object 1
							{
								ID: '1a1', 
								Type: 'Aluminum', 
								AmericartCode: 'a-8880^Wend24HrAlum^Wendells 24 HOUR Aluminum ^.35^op2', 
								img: 'images/style1/Wend5b.jpg',
								imgAlt: 'Medallions',
								ParentID: '1a',
								productOptions: 
								[		
										{Name: 'op1', Value: 'quantity'}
								]
							},

							//object 2
							{
								ID: '1a2', 
								Type: 'Colored', 
								AmericartCode: 'a-8880^WendMonthAlum^Wendells Month Aluminum - Month ^.45^op2', 
								img: 'images/style1/Wend5b.jpg',
								imgAlt: 'Medallions',
								ParentID: '1a',
								productOptions: 
								[
										{Name: 'op1', Value: 'month'},
										{Name: 'op2', Value: 'quantity'}
								]
							},

							//object 3
							{
								ID: '1a3', 
								Type: 'Bronze', 
								AmericartCode: 'a-8880^WendBnzYr^Wendells Bronze Anniversary - Year ^1.10^op2', 
								img: 'images/style1/Wend5b.jpg',
								imgAlt: 'Medallions', 
								ParentID: '1a',
								productOptions: 
								[
										{Name: 'op1', Value: 'year'},
										{Name: 'op2', Value: 'quantity'}
								]
							},

												// {productOptions: // <-- adds different input boxes for prooducts. Ex. quantity-field year-field etc...					
												// 	[
												// 		{ID: '1a1a', op1: 'quantity', ParentID: '1a1'},
												// 		{ID: '1a2a', op1: 'month', op2: 'quantity', ParentID: '1a2'},
												// 		{ID: '1a3a', op1: 'year', op2: 'quantity', ParentID: '1a3'},
												// 	]} // end productOptions
						]} //end Style

				]//end medallionType

			},//end Medallions

			{
				ID: '2', 
				Name: 'Shirts',
				Type: [{Style:[]}]

			} // <-- Next product category - such as mugs hats shirts etc...

		]; //end window.products

	} //end of product objs

	function checkoutDropDown()
	{	
		if(window.Data == false || window.Data ==  undefined)
		{
			var hideDropDown = document.getElementById('dropDownType');
			hideDropDown.classList.add('hideItems');	
		}//end if
		else{
				var selectType = document.getElementById('dropDownType');

				for (var i = 0; i < window.Data.Style.length; i++) 
				{
			 		 var newOption = document.createElement('option');
			 		 newOption.text = window.Data.Style[i].Type;
			 		 newOption.value = window.Data.Style[i].ID;
			 		 dropDownType.options.add(newOption);
				}//end for

				selectType.onchange = function(e)
				{
					dropDownValue = e.target.options[e.target.selectedIndex].value;
					console.log(dropDownValue);
					var styleObj;

					//eventually there may be stand alone products that do not need a dropdown style selector...
					// thus filter based on selection and plug in html accordingly
						for(var i = 0; i < window.Data.Style.length; i++)
						{	
							if(dropDownValue == -1)
							{
								document.getElementById('populateCheckout').innerHTML = '';
							}
							if(dropDownValue == window.Data.Style[i].ID)
							{
								styleObj = window.Data.Style[i];
								break;
							}
						}//end for				

						populate(styleObj);
			}//end else
		}//end dropDownValue

	} // end checkoutDropDown


	//populates and html and runs plus/minus button script
	function populate(dropDownValue)
	{
		// var AmericartCode = console.log(dropDownValue);
		var getElement = document.getElementById('populateCheckout');

		var html = "";

		html += '<input type="hidden" name="item" value="'+dropDownValue.AmericartCode+'"/>' +
         '<input type=hidden name=n value='+ Math.random() + "" +'>' +
         '<div class="productWrap">' +
         '<img src="'+dropDownValue.img+'" alt="'+dropDownValue.imgAlt+'" style="margin-bottom: 10px" width="125" height="128" />';

         for(var i = 0; i < dropDownValue.productOptions.length; i++)
         {
         	//populates year field
			if(dropDownValue.productOptions[i].Value == 'year')
			{
				html +=
				'<h3> Year </h3>' +
                '<span>' +
                    '<div class="minusButton" id="minus1"></div>' + 
                '</span>' +
                '<span>' +
                    '<div class="checkoutInputOps">' +
                        '<input class="inputBox" id="input1" type="text" name="op1">' +
                    '</div>' +
                '</span>' +
                '<span>' +
                '<div class="plusButton" id="plus1"></div>' +
                '</span>' +
                '<br><br>';
			}

			//populates month field
			if(dropDownValue.productOptions[i].Value == 'month')
			{
				html +=
				'<h3> Month </h3>' +
                '<span>' +
                    '<div class="minusButton" id="minus1"></div>' + 
                '</span>' +
                '<span>' +
                    '<div class="checkoutInputOps">' +
                        '<input class="inputBox" id="input1" type="text" name="op1">' +
                    '</div>' +
                '</span>' +
                '<span>' +
                '<div class="plusButton" id="plus1"></div>' +
                '</span>' +
                '<br><br>';
			}

         	//populates quantity field
         	if(dropDownValue.productOptions[i].Value == 'quantity')
         	{
         		html +=
         		'<h3> Quantity </h3>' +
                '<span>' +
                    '<div class="minusButton" id="minus2"></div>' +
                '</span>' +
                '<div class="checkoutInputOps">' +
                    '<input class="inputBox" id="input2" type="text" name="op2">'+
                '</div>' +
                '<span>' +
                '<div class="plusButton" id="plus2" ></div>' +
                '</span>' +
                '<br><br>';
         	}

         } //end for

         html += '<input type="image" src="images/addToCart.png" name="nvadd">';

         getElement.innerHTML = html;

//runs plus/minus button script
	var _plusButtons = document.getElementsByClassName('plusButton'),
		_minusButtons = document.getElementsByClassName('minusButton'),
		i = 0;



	//checks if nothing is before quantity
	var check = document.getElementById('minus1');


	if(check != null){
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

	}// end if check
	
	

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
	}

	//finds product based on user selection
	function findProduct(productType)
	{
		var _foundProduct;

		switch (productType) 
		{

			case 'medallion':
				for(var i = 0; i < window.products.length; i++)
				{
			    	 if(parseUsersQuery('productID') == products[i].ID)
						{
							for (var x = 0; x< products[i].Type.length; x++)
								{
					      			if(parseUsersQuery('TypeID') == products[i].Type[x].ID)
					      				{
					          				_foundProduct = products[i].Type[x];
					     				}
								}//end for #2
						}
				}//end for #1

				break;
			default:
				break;
		}//end switch

		console.log(_foundProduct);
		window.Data = _foundProduct;

	} // end findProduct

	//RUN SHIT
	productObjects();
	findProduct('medallion'); //check medallion l8r.. DO NOT want to be limited to scope of medallion "class"

	if (document.getElementById('dropDownType') != undefined) {
		checkoutDropDown();
	}
} // end of initilize