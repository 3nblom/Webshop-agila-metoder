$(document).ready(function() {
              
	
	$(".next").click(function(agree) {
	  var current_index = $(this).parent().index("fieldset");
	  
	  if(validateStep(current_index)){			//current_index = sida 
		  makeStepActive(current_index+1);		//Om sidan innan godkäns aktivera nextknappen
	  }else{
		  agree.preventDefault();
	  }
	});

	$(".previous").click(function() {
	  var current_index = $(this).parent().index("fieldset");		//Bakåtknappen 
	  makeStepActive(current_index - 1);
	});

   makeStepActive(0);	
   
  });

  function makeStepActive(index){
	  var step = $("#checkout_headings_form li:eq("+index+")");
	  var fieldset = $("fieldset:eq("+index+")");
	  if(step.length){
		  $("#checkout_headings_form li").hide();					//Rubriker
		  $("fieldset").hide();
		  step.show();
		  fieldset.slideDown(500);
	  }
  }

  function validateStep(step){				
	  switch(step){
		  case 0:

		  
			  if(($("input[name='checkout_payment_options1']:checked").length === 0)){
				  alert('Välj ett betalningsalternativ');									//Modal betlaningsalternativ
				  return false;
			  }
			  return true;
		  break;
		  default:
			  var ids = ["firstname", "lastname", "phone", "email", "street", "zipcode", "city"];
			  var err = [];
			  ids.forEach(function(id, i){
				  var value = $("#"+id).val();
				  if ($.trim(value).length === 0) {
					document.getElementById(id).style.borderColor = "#E34234";
					err.push('Please Enter Your '+id);								//Fungerar ej ...? 
					return false;							
				  }
				  return true;
			  });
		  break;
		  case 1:
			  if(($("input[name='agree']:checked").length === 0)){
				  alert('Godkänn köpvillkoren');							// Modal köpvillkor
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