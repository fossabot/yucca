$(document).ready(function(){
	$.ajax({
		url : 'https://userportal.smartdatanet.it/userportal/api/info?',
		type : 'GET',
		dataType:'json',
		success : function(data) {              
			console.log('info: '+data);
		},
		error : function(request,error){
			console.log("Error info: "+JSON.stringify(request));
		}
	});
});