/*
$(document).ready(function(){
	$.ajax({
		url : 'https://userportal.smartdatanet.it/userportal/api/info?',
		dataType:'jsonp',
		jsonp: "callback",
		success : function(data) {              
			console.log('info : ', data);
			if(data && data.user && data.user.username && data.user.username!=null){
				$("#username").html('<i class="fa fa-user-circle fa-lg"></i>&nbsp;' + data.user.username);
			}
		},
		error : function(request,error){
			console.log("Error info: "+JSON.stringify(request));
		}
	});
});*/