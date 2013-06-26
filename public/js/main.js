	$(document).ready(function(){
		$('.tweets tr:even').css("background-color", "#f2f2f2");		
		/*popup*/
		$('#showPopup').click( function() {			
			loadPopupBox();
		});
		$('#popupBoxClose').click( function() {			
			unloadPopupBox();
		});
		
/*		$('#container').click( function() {
			unloadPopupBox();
		});*/

		function unloadPopupBox() {	// TO Unload the Popupbox
			$('#popup_box').fadeOut("slow");
			$(".over").removeClass("overlay");	
		}	
		
		function loadPopupBox() {	// To Load the Popupbox
			$('#popup_box').fadeIn("slow");
			$(".over").addClass("overlay");	
		}
		$('#alertClose').click( function() {			
			$('.alertCon').fadeOut("slow");
		});
		$('.mesCount').click( function() {			
			$('.alertCon').fadeIn("slow");
			$('.alertCon').css('display','block');
		});
		/*---*/
		
		
		
		$('#showPopup2').click( function() {			
			loadPopupBox2();
		});
		$('#popupBoxClose2').click( function() {			
			unloadPopupBox2();
		});	
		
		$('.showPopup2').click( function() {			
			loadPopupBox2();
		});
		$('.popupBoxClose2').click( function() {			
			unloadPopupBox2();
		});
		$('.overlay').click( function() {			
			unloadPopupBox2();
		});
/*		$('#container').click( function() {
			unloadPopupBox();
		});*/

		function unloadPopupBox2() {	// TO Unload the Popupbox
			$('#alertRule').fadeOut("slow");
			$(".over").removeClass("overlay");	
		}	
		
		function loadPopupBox2() {	// To Load the Popupbox
			$('#alertRule').fadeIn("slow");
			$(".over").addClass("overlay");	
		}
		
		
		$('.showPopup3').click( function() {			
			loadPopupBox3();
		});
		$('#popupBoxClose3').click( function() {			
			unloadPopupBox3();
		});
		
		function loadPopupBox3() {	// To Load the Popupbox
			$('#popup_boxForEdit').fadeIn("slow");
			$(".over").addClass("overlay");	
		}
		function unloadPopupBox3() {	// TO Unload the Popupbox
			$('#popup_boxForEdit').fadeOut("slow");
			$(".over").removeClass("overlay");	
		}	
		
		/**********************************************************/
	
	
	
	$('.switch').css('background', 'url("/img/switch/switch.png")');
	$('.on_off').css('display','none');
	$('#on, #off').css('text-indent','-100px');

    $("input[name=smsToggle]").change(function() {
      var button = $(this).val();
	  
		if(button == 'off'){ $('.switch').css('background-position', 'right'); }
		if(button == 'on'){ $('.switch').css('background-position', 'left'); }	 
   });
	
	$('.switch2').css('background', 'url("/img/switch/switch.png")');
	$('.on_off2').css('display','none');
	$('#on2, #off2').css('text-indent','-100px');

    $("input[name=emailToggle]").change(function() {
      var button = $(this).val();
	  
		if(button == 'off'){ $('.switch2').css('background-position', 'right'); }
		if(button == 'on'){ $('.switch2').css('background-position', 'left'); }	 
   });
	
	$('.switch3').css('background', 'url("/img/switch/switch.png")');
	$('.on_off3').css('display','none');
	$('#on3, #of3f').css('text-indent','-100px');

    $("input[name=dashToggle]").change(function() {
      var button = $(this).val();
	  
		if(button == 'off'){ $('.switch3').css('background-position', 'right'); }
		if(button == 'on'){ $('.switch3').css('background-position', 'left'); }	 
   });
	
	$('.switch4').css('background', 'url("/img/switch/switch.png")');
	$('.on_off4').css('display','none');
	$('#on4, #off4').css('text-indent','-100px');

    $("input[name=mobileToggle]").change(function() {
      var button = $(this).val();
	  
		if(button == 'off'){ $('.switch4').css('background-position', 'right'); }
		if(button == 'on'){ $('.switch4').css('background-position', 'left'); }	 
   });
   
   $('.tweets tr:even').css("background-color", "#f2f2f2");	
   
	$(".opened").click(function() {
	  $('.leftMenuContent').toggleClass("colasps");
	});
   
});

function incrementValue()
{
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('number').value = value;
}
function decrementValue()
{
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value--;
	document.getElementById('number').value = value;
}	
/*validation
// <![CDATA[
		var frmvalidator  = new Validator("contactus");
		frmvalidator.EnableOnPageErrorDisplay();
		frmvalidator.EnableMsgsTogether();
		frmvalidator.addValidation("team","req","Please provide value");
		frmvalidator.addValidation("teamo","req","Please provide value");
		frmvalidator.addValidation("sms","req","Please provide valuee");
		frmvalidator.addValidation("email","req","Please provide your email address");
		frmvalidator.addValidation("email","email","Please provide a valid email address");
		frmvalidator.addValidation("usern","req","Please provide user name");
		frmvalidator.addValidation("passw","req","Please provide password");
		
	
	// ]]>*/