$(document).ready(function() {		//Rätt fil

	let pLink = document.getElementById("terms_and_conditions");     	//Öppna terms and conditions
    pLink.addEventListener("click", function(){

		window.open("../html/termsandconditions.html");

    });
	//funkar
	$(".next").click(function(agree) {								//Nextknappen för kunduppgifter
	  var current_index = $(this).parent().index("fieldset");

	  let validateSuccess = validateStep(current_index);
	  console.log("Validering: ", validateSuccess);
	  if(validateSuccess){
		  makeStepActive(current_index+1);
	  }else{
		  agree.preventDefault();
	  }
	});
	//funkar

	  //orginal radio
	  $(".next2").click(function(agree) {								//Nextknappen för input radiobutton
		var current_index = $(this).parent().index("fieldset");

		if(validateStep(current_index)){
			makeStepActive(current_index+1);
		}else{
			agree.preventDefault();
		}
	  });
	  //orginal

	  //funkar
	$(".confirm").click(function(agree) {								//Slutför köp knappen
		var current_index = $(this).parent().index("fieldset");

		let validateSuccess = validateStep(current_index);
		console.log("Validering: ", validateSuccess);
		if(validateSuccess){
			makeStepActive(current_index + 1);
		}else{
			agree.preventDefault();
		}
	  });
	  //funkar

	//funkar
	$(".previous").click(function() {								//Bakåtknappen
	  var current_index = $(this).parent().index("fieldset");
	  makeStepActive(current_index - 1);
	});
	//funkar

   makeStepActive(0);



  function makeStepActive(index){
	  console.log("Making step " + index + " active");
	  var step = $("#checkout_headings_form li:eq("+index+")");
	  var fieldset = $("fieldset:eq("+index+")");
	  if(step.length){
		  $("#checkout_headings_form li").hide();					//Rubriker "del 1 av 3" osv... (visa ett fieldset, dölj de andra två)
		  $("fieldset").hide();
		  step.show();
		  fieldset.slideDown(500);
	  }
  }

  function validateStep(step){										//Validera kunduppgifter
	  console.log("Validating step: ", step);
	  switch(step){
		  case 0:
			var ids = ["firstname", "lastname", "phone", "email", "street", "zipcode", "city"];
			var err = [];
			let hasError = false;
			ids.forEach(function(id, i){
				var value = $("#"+id).val();
				if ($.trim(value).length === 0) {
					document.getElementById(id).style.borderColor = "#E34234";
					// let errorMessage = err.push('Please Enter Your '+id);				// koppla till HTML, se rad 113??? (denna funkar ej)
					// let errorSpan = document.getElementsByClassName("fs-error");
					// errorSpan.innerHTML=errorMessage;
					hasError = true;
				}

			});
			return !hasError;
		  break;
		  //CASE 1
		  case 1:

			if(($("input[name='checkout_payment_options']:checked").length === 0)){			//Validera betlaningsalternativ
				alert('Välj ett betalningsalternativ');
				return false;
			}
			return true;
		break;
			//org

			//CASE 1
		break;

			default:
				if(($("input[name='agree']:checked").length === 0)){
					alert('Godkänn köpvillkoren');							// Validera köpvillkor
					return false;
				}
				return true;

				if(err.length > 0){
					$('.fs-error').html('<span style="color:red;">'+err.join('!<br>')+'</span>');
					$('.fs-error').show();

					return false;
				}else{
					return true;
				}
	  }
  }


});
