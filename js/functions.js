// JavaScript Document
function doInit(){
	if (formErrorMessage){
		$("#errorMessageDiv").html(formErrorMessage);
		openDialog = true;
	}
	else {
		openDialog = false;
	}
	if (!loggedIn){
			
		$( "#logOnDialog" ).dialog({ //Initialize popup dialog for logon
			autoOpen: openDialog,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Log On": function() {
					$(this).dialog("close");
					$("#loginForm").submit();
				}
			}
		});
	}
	else {
		$( "#accountDialog" ).dialog({ //Initialize popup dialog for logon
			autoOpen: openDialog,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#accountForm").submit();
				}
			}
		});
	}
}
function showLogin(){
	$( "#logOnDialog" ).dialog('open');
}
function showAccount(){
	$( "#accountDialog" ).dialog('open');
}
	
	