// JavaScript Document

var countryNamesToMapCodes = { 'Bangladesh' : 'BD', 'Belgium' : 'BE', 'Burkina Faso' : 'BF', 'Bulgaria' : 'BG', 'Bosnia and Herzegovina' : 'BA', 'Brunei' : 'BN', 'Bolivia' : 'BO', 'Japan' : 'JP', 'Burundi' : 'BI', 'Benin' : 'BJ', 'Bhutan' : 'BT', 'Jamaica' : 'JM', 'Botswana' : 'BW', 'Brazil' : 'BR', 'The Bahamas' : 'BS', 'Belarus' : 'BY', 'Belize' : 'BZ', 'Russia' : 'RU', 'Rwanda' : 'RW', 'Republic of Serbia' : 'RS', 'Lithuania' : 'LT', 'Luxembourg' : 'LU', 'Liberia' : 'LR', 'Romania' : 'RO', 'Guinea Bissau' : 'GW', 'Guatemala' : 'GT', 'Greece' : 'GR', 'Equatorial Guinea' : 'GQ', 'Guyana' : 'GY', 'Georgia' : 'GE', 'United Kingdom' : 'GB', 'Gabon' : 'GA', 'Guinea' : 'GN', 'Gambia' : 'GM', 'Greenland' : 'GL', 'Kuwait' : 'KW', 'Ghana' : 'GH', 'Oman' : 'OM', 'Somaliland' : '_3', 'Western Sahara' : '_2', 'Kosovo' : '_1', 'Northern Cyprus' : '_0', 'Jordan' : 'JO', 'Croatia' : 'HR', 'Haiti' : 'HT', 'Hungary' : 'HU', 'Honduras' : 'HN', 'Puerto Rico' : 'PR', 'West Bank' : 'PS', 'Portugal' : 'PT', 'Paraguay' : 'PY', 'Panama' : 'PA', 'Papua New Guinea' : 'PG', 'Peru' : 'PE', 'Pakistan' : 'PK', 'Philippines' : 'PH', 'Poland' : 'PL', 'Zambia' : 'ZM', 'Estonia' : 'EE', 'Egypt' : 'EG', 'South Africa' : 'ZA', 'Ecuador' : 'EC', 'Albania' : 'AL', 'Angola' : 'AO', 'Kazakhstan' : 'KZ', 'Ethiopia' : 'ET', 'Zimbabwe' : 'ZW', 'Spain' : 'ES', 'Eritrea' : 'ER', 'Montenegro' : 'ME', 'Moldova' : 'MD', 'Madagascar' : 'MG', 'Morocco' : 'MA', 'Uzbekistan' : 'UZ', 'Myanmar' : 'MM', 'Mali' : 'ML', 'Mongolia' : 'MN', 'Macedonia' : 'MK', 'Malawi' : 'MW', 'Mauritania' : 'MR', 'Uganda' : 'UG', 'Malaysia' : 'MY', 'Mexico' : 'MX', 'Vanuatu' : 'VU', 'France' : 'FR', 'Finland' : 'FI', 'Fiji' : 'FJ', 'Falkland Islands' : 'FK', 'Nicaragua' : 'NI', 'Netherlands' : 'NL', 'Norway' : 'NO', 'Namibia' : 'NA', 'New Caledonia' : 'NC', 'Niger' : 'NE', 'Nigeria' : 'NG', 'New Zealand' : 'NZ', 'Nepal' : 'NP', 'Ivory Coast' : 'CI', 'Switzerland' : 'CH', 'Colombia' : 'CO', 'China' : 'CN', 'Cameroon' : 'CM', 'Chile' : 'CL', 'Canada' : 'CA', 'Republic of the Congo' : 'CG', 'Central African Republic' : 'CF', 'Democratic Republic of the Congo' : 'CD', 'Czech Republic' : 'CZ', 'Cyprus' : 'CY', 'Costa Rica' : 'CR', 'Cuba' : 'CU', 'Swaziland' : 'SZ', 'Syria' : 'SY', 'Kyrgyzstan' : 'KG', 'Kenya' : 'KE', 'South Sudan' : 'SS', 'Suriname' : 'SR', 'Cambodia' : 'KH', 'El Salvador' : 'SV', 'Slovakia' : 'SK', 'South Korea' : 'KR', 'Slovenia' : 'SI', 'North Korea' : 'KP', 'Somalia' : 'SO', 'Senegal' : 'SN', 'Sierra Leone' : 'SL', 'Solomon Islands' : 'SB', 'Saudi Arabia' : 'SA', 'Sweden' : 'SE', 'Sudan' : 'SD', 'Dominican Republic' : 'DO', 'Djibouti' : 'DJ', 'Denmark' : 'DK', 'Germany' : 'DE', 'Yemen' : 'YE', 'Austria' : 'AT', 'Algeria' : 'DZ', 'United States' : 'US', 'Latvia' : 'LV', 'Uruguay' : 'UY', 'Lebanon' : 'LB', 'Laos' : 'LA', 'Taiwan' : 'TW', 'Trinidad and Tobago' : 'TT', 'Turkey' : 'TR', 'Sri Lanka' : 'LK', 'Tunisia' : 'TN', 'East Timor' : 'TL', 'Turkmenistan' : 'TM', 'Tajikistan' : 'TJ', 'Lesotho' : 'LS', 'Thailand' : 'TH', 'French Southern and Antarctic Lands' : 'TF', 'Togo' : 'TG', 'Chad' : 'TD', 'Libya' : 'LY', 'United Arab Emirates' : 'AE', 'Venezuela' : 'VE', 'Afghanistan' : 'AF', 'Iraq' : 'IQ', 'Iceland' : 'IS', 'Iran' : 'IR', 'Armenia' : 'AM', 'Italy' : 'IT', 'Vietnam' : 'VN', 'Argentina' : 'AR', 'Australia' : 'AU', 'Israel' : 'IL', 'India' : 'IN', 'Tanzania' : 'TZ', 'Azerbaijan' : 'AZ', 'Ireland' : 'IE', 'Indonesia' : 'ID', 'Ukraine' : 'UA', 'Qatar' : 'QA', 'Mozambique' : 'MZ'};


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
			width: 400,
			modal: true,
			buttons: {
				"Save": function() {
					$(this).dialog("close");
					$("#accountForm").submit();
				}
			}
		});
	}
	if (country in countryNamesToMapCodes){
		countryCode = countryNamesToMapCodes[country];
	}
	else {
		countryCode = false;
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
			markers : [{latLng : latlong, name : 'Diane'}]
	});
}
function showLogin(){
	$( "#logOnDialog" ).dialog('open');
}
function showAccount(){
	$( "#accountDialog" ).dialog('open');
}
	