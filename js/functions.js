// JavaScript Document

var countryNamesToMapCodes = { 'Bangladesh' : 'BD', 'Belgium' : 'BE', 'Burkina Faso' : 'BF', 'Bulgaria' : 'BG', 'Bosnia and Herzegovina' : 'BA', 'Brunei' : 'BN', 'Bolivia' : 'BO', 'Japan' : 'JP', 'Burundi' : 'BI', 'Benin' : 'BJ', 'Bhutan' : 'BT', 'Jamaica' : 'JM', 'Botswana' : 'BW', 'Brazil' : 'BR', 'The Bahamas' : 'BS', 'Belarus' : 'BY', 'Belize' : 'BZ', 'Russia' : 'RU', 'Rwanda' : 'RW', 'Republic of Serbia' : 'RS', 'Lithuania' : 'LT', 'Luxembourg' : 'LU', 'Liberia' : 'LR', 'Romania' : 'RO', 'Guinea Bissau' : 'GW', 'Guatemala' : 'GT', 'Greece' : 'GR', 'Equatorial Guinea' : 'GQ', 'Guyana' : 'GY', 'Georgia' : 'GE', 'United Kingdom' : 'GB', 'Gabon' : 'GA', 'Guinea' : 'GN', 'Gambia' : 'GM', 'Greenland' : 'GL', 'Kuwait' : 'KW', 'Ghana' : 'GH', 'Oman' : 'OM', 'Somaliland' : '_3', 'Western Sahara' : '_2', 'Kosovo' : '_1', 'Northern Cyprus' : '_0', 'Jordan' : 'JO', 'Croatia' : 'HR', 'Haiti' : 'HT', 'Hungary' : 'HU', 'Honduras' : 'HN', 'Puerto Rico' : 'PR', 'West Bank' : 'PS', 'Portugal' : 'PT', 'Paraguay' : 'PY', 'Panama' : 'PA', 'Papua New Guinea' : 'PG', 'Peru' : 'PE', 'Pakistan' : 'PK', 'Philippines' : 'PH', 'Poland' : 'PL', 'Zambia' : 'ZM', 'Estonia' : 'EE', 'Egypt' : 'EG', 'South Africa' : 'ZA', 'Ecuador' : 'EC', 'Albania' : 'AL', 'Angola' : 'AO', 'Kazakhstan' : 'KZ', 'Ethiopia' : 'ET', 'Zimbabwe' : 'ZW', 'Spain' : 'ES', 'Eritrea' : 'ER', 'Montenegro' : 'ME', 'Moldova' : 'MD', 'Madagascar' : 'MG', 'Morocco' : 'MA', 'Uzbekistan' : 'UZ', 'Myanmar' : 'MM', 'Mali' : 'ML', 'Mongolia' : 'MN', 'Macedonia' : 'MK', 'Malawi' : 'MW', 'Mauritania' : 'MR', 'Uganda' : 'UG', 'Malaysia' : 'MY', 'Mexico' : 'MX', 'Vanuatu' : 'VU', 'France' : 'FR', 'Finland' : 'FI', 'Fiji' : 'FJ', 'Falkland Islands' : 'FK', 'Nicaragua' : 'NI', 'Netherlands' : 'NL', 'Norway' : 'NO', 'Namibia' : 'NA', 'New Caledonia' : 'NC', 'Niger' : 'NE', 'Nigeria' : 'NG', 'New Zealand' : 'NZ', 'Nepal' : 'NP', 'Ivory Coast' : 'CI', 'Switzerland' : 'CH', 'Colombia' : 'CO', 'China' : 'CN', 'Cameroon' : 'CM', 'Chile' : 'CL', 'Canada' : 'CA', 'Republic of the Congo' : 'CG', 'Central African Republic' : 'CF', 'Democratic Republic of the Congo' : 'CD', 'Czech Republic' : 'CZ', 'Cyprus' : 'CY', 'Costa Rica' : 'CR', 'Cuba' : 'CU', 'Swaziland' : 'SZ', 'Syria' : 'SY', 'Kyrgyzstan' : 'KG', 'Kenya' : 'KE', 'South Sudan' : 'SS', 'Suriname' : 'SR', 'Cambodia' : 'KH', 'El Salvador' : 'SV', 'Slovakia' : 'SK', 'South Korea' : 'KR', 'Slovenia' : 'SI', 'North Korea' : 'KP', 'Somalia' : 'SO', 'Senegal' : 'SN', 'Sierra Leone' : 'SL', 'Solomon Islands' : 'SB', 'Saudi Arabia' : 'SA', 'Sweden' : 'SE', 'Sudan' : 'SD', 'Dominican Republic' : 'DO', 'Djibouti' : 'DJ', 'Denmark' : 'DK', 'Germany' : 'DE', 'Yemen' : 'YE', 'Austria' : 'AT', 'Algeria' : 'DZ', 'United States' : 'US', 'Latvia' : 'LV', 'Uruguay' : 'UY', 'Lebanon' : 'LB', 'Laos' : 'LA', 'Taiwan' : 'TW', 'Trinidad and Tobago' : 'TT', 'Turkey' : 'TR', 'Sri Lanka' : 'LK', 'Tunisia' : 'TN', 'East Timor' : 'TL', 'Turkmenistan' : 'TM', 'Tajikistan' : 'TJ', 'Lesotho' : 'LS', 'Thailand' : 'TH', 'French Southern and Antarctic Lands' : 'TF', 'Togo' : 'TG', 'Chad' : 'TD', 'Libya' : 'LY', 'United Arab Emirates' : 'AE', 'Venezuela' : 'VE', 'Afghanistan' : 'AF', 'Iraq' : 'IQ', 'Iceland' : 'IS', 'Iran' : 'IR', 'Armenia' : 'AM', 'Italy' : 'IT', 'Vietnam' : 'VN', 'Argentina' : 'AR', 'Australia' : 'AU', 'Israel' : 'IL', 'India' : 'IN', 'Tanzania' : 'TZ', 'Azerbaijan' : 'AZ', 'Ireland' : 'IE', 'Indonesia' : 'ID', 'Ukraine' : 'UA', 'Qatar' : 'QA', 'Mozambique' : 'MZ'};


function doInit(){

	if (initData['isLoggedIn']){			
		$( "#editAccountDialog" ).dialog({
			autoOpen: false,
			height: 300,
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#editAccountForm").submit();
				}
			}
		});
		$( "#setLocationDialog" ).dialog({
			autoOpen: false,
			height: 300,
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#setLocationForm").submit();
				}
			}
		});
		$( "#editLocationDialog" ).dialog({
			autoOpen: false,
			height: 500,
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#editLocationForm").submit();
				}
			}
		});
		$( "#editPhoneNumberDialog" ).dialog({
			autoOpen: false,
			height: 300,
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#editPhoneNumberForm").submit();
				}
			}
		});
		indexLocations();
		$("#mainTabGroup").tabs( {active : $("#mainTabGroup>div").index($("#" + initData['activeTab'])) } );

	}
	else {
		$( "#loginDialog" ).dialog({ //Initialize popup dialog for logon
			autoOpen: false,
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
	if (initData['currentLocation']['country'] in countryNamesToMapCodes){
		countryCode = countryNamesToMapCodes[initData['currentLocation']['country']];
	}
	else {
		countryCode = false;
	}
	if (initData['activeForm']){
		$("#" + initData['activeForm'] + "Message").html(initData['error']);
		$("#" + initData['activeForm'] + "Dialog").dialog("open");
	}

    $('#worldMap').vectorMap({
          map: 'world_mill_en',
		  backgroundColor: '#000000',
		  regionStyle : {
			  initial: {
				fill: '#000000',
				"fill-opacity": 1,
				stroke: '#ff7cd8',
				"stroke-width": 1,
				"stroke-opacity": 0.2
			  },
			  hover: {
				fill:'#ff7cd8'
			  },
			  selected: {
				fill:'#ff7cd8'
			  },
			  selectedHover: {
			  }
			},
			selectedRegions : countryCode,
			markers : [{latLng  : [initData['currentLocation']['latitude'], initData['currentLocation']['longitude']], name : 'Diane'}]
	});
}
function showLogin(){
	$( "#loginDialog" ).dialog('open');
}
function showAccount(){
	$("#editAccountDialog").dialog('open');
}
function setLocation(threeLetterCode, subCode){
	$("#setLocationThreeLetterCode").val(threeLetterCode);
	$("#setLocationSubCode").val(subCode);
	$("#setLocationDialog").dialog('open');
}
function editLocation(threeLetterCode, subCode){
	$("#editLocationCurrentThreeLetterCode").val(threeLetterCode);
	$("#editLocationCurrentSubCode").val(subCode);
	$("#editLocationDialog").dialog('open');
	$("#editLocationThreeLetterCode").css("display", "none");
	$("label[for='threeLetterCode']").css("display", "none");
	$("#editLocationSubCode").css("display", "none");
	$("label[for='subCode']").css("display", "none");

}
function addLocation(){
	$("#editLocationCurrentThreeLetterCode").val('');
	$("#editLocationCurrentSubCode").val('');
	$("#editLocationDialog").dialog('open');
	$("#editLocationThreeLetterCode").css("display", "block");
	$("label[for='threeLetterCode']").css("display", "block");
	$("#editLocationSubCode").css("display", "block");
	$("label[for='subCode']").css("display", "block");

}
function editPhoneNumber(phoneNumberId){
	$("#editPhoneNumberPhoneNumberId").val(phoneNumberId);
	$("#editPhoneNumberDialog").dialog('open');
	$("#editPhoneNumberName").val(initData['phoneNumbers'][phoneNumberId]['name']);
	$("#editPhoneNumberPhoneNumber").val(initData['phoneNumbers'][phoneNumberId]['phoneNumber']);
}
function addPhoneNumber(){
	$("#editPhoneNumberPhoneNumberId").val('');
	$("#editPhoneNumberDialog").dialog('open');
}
function indexLocations(){
	if ("locations" in initData){
		var restructuredData = {};
		for (i=0; i< initData['locations'].length; i++){
			threeLetterCode = initData['locations'][i]['threeLetterCode'];
			subCode = initData['locations'][i]['threeLetterCode'];
			if (!(threeLetterCode in restructuredData)){
				restructuredData[threeLetterCode] = {};
			}
			restructuredData[threeLetterCode][subCode] = initData['locations'][i];
		}
		initData['locations'] = restructuredData;
		var restructuredData = {};
		for (i=0; i< initData['phoneNumbers'].length; i++){
			id = initData['phoneNumbers'][i]['id'];
			restructuredData[id] = initData['phoneNumbers'][i];
		}
		initData['phoneNumbers'] = restructuredData;
	}
			
				
			
				
	
	
}