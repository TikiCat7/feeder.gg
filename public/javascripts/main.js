$("document").ready(function(){
	console.log("welcome to elo h3ll");

//sidebar active selection
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

//side bar mouse over
$(".nav a").on("mouseover", function() {
	$(this).parent("li").addClass("hovered");
});

//side bar mouse leave
$(".nav a").on("mouseleave", function() {
	$(this).parent("li").removeClass("hovered");
});

$(".title").on("click", function() {
	window.location = '/';
});

$(".dropdown-menu a").on('click', function(){
	$("#dropdownmenu").text($(this).html());
});

$(".registerButton").on('click', function(){
	registerUser();
});


function registerUser() {
	console.log("in registerUser()");

	var user = {
		'email':$("#userEmail").val(),
		'password':$("#userPass").val(),
		'summonername':$("#userSummonerName").val(),
		'region':$("#dropdownmenu").text()
	}

	$.post('/register/newRegister',user).success(function(res){
		console.log(res.message)
		
		res.success == true ? console.log('your token is: '+res.jwt) : console.log(res.message);

		if(res.success==true) {
			//console.log(document.coookies);
			//if new user was made, try accessing protected api
			console.log('setting auth header as:'+res.jwt);
			$.ajax({
				url: '/private/test',
				type: 'GET',
				beforeSend: function(xhr) {
 		      		xhr.setRequestHeader("Authorization",res.jwt);
    			}
			}).success(function(res){
				console.log(res.message);
			});
		}

		//cookie now has jwt stored

		//login
		//store returned JWT if registration + login successful
		//redirect to dashboard
	});



	// $.ajax({
	// 	url: '/register/newRegister',
	// 	type: 'POST',
	// 	data: user,
	// 	beforeSend: function(xhr) {
 //      		xhr.setRequestHeader("Authorization", "Bearer " + $.cookie('jwt'));
 //    	}
	// }).success(function(res){
	// 	console.log(res.message);
	// 	res.success == true ? console.log('your token is: '+res.jwt) : console.log(res.message);
	// });
	
};

});