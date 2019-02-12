$(document).ready(function(){
	$.ajax({
		url : 'https://userportal.smartdatanet.it/userportal/api/info?',
		dataType:'jsonp',
		jsonp: "callback",
		success : function(data) {              
			console.log('info: '+data);
		},
		error : function(request,error){
			console.log("Error info: "+JSON.stringify(request));
		}
	});
});