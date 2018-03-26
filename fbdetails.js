$(document).ready(function(){

		 $("#invalidAjax").hide();//Hide Error Window
		 $("#myProfile").hide();//Hide MyProfile Window

		 getFeedDetails();

		 // function to get feed details
		 function getFeedDetails(){

		 			//Access Token
		 			var token = prompt("Enter an access token", " ");
					$("#myProfile").hide(1000);//HIde My Profile WIndow
					$("#myFeed").show(1000);//Show My Feed Window

					// Ajax Call
					var details = $.ajax({

							 url: "https://graph.facebook.com/me?fields=posts%7Bstory,full_picture,message,created_time%7D,name,picture.type%28large%29&access_token="+token,
							 type: "GET",
							 dataType: "json",

					});

					//AJAX Success
					details
					.done(function(data, status, jqXHR){

							 $("#invalidAjax").fadeOut(1000);//Hide Error Window
							 var posts_data = data.posts.data;

							 //Looping Through 10 posts
							 for ( i = 0 ; i < 10 ; i++)
							 {
										// If Story is Unavailable
										if ( posts_data[i].story == undefined  ){
												 var str = data.name;
										}
										else{
												 var str = posts_data[i].story;
										}

										// If Message is Unavailable
										if ( posts_data[i].message == undefined  ){
												 var msg = '';
										}
										else{
												 var msg = posts_data[i].message;
										}

										// If no image available
										if ( posts_data[i].full_picture == undefined  ){
												 $("postPic").text("OK");
												 var p = 0;
										}
										else{
												 var p = 1;
										}

										// My Feed Section
										$("#myFeed").append(
												'<div class = "row posts">\
															<div class = "col-xs-3 col-md-3 col-lg-3" id = "profilePic">\
																				<img src = ' + data.picture.data.url + ' style = "width:10vmin" />\
															</div>\
															<div class = "col-xs-9 col-md-9 col-lg-9">\
																	 ' + str + ' <br>\
																		- on ' + data.posts.data[i].created_time + '.\
															</div>\
												 </div><br>\
												 <center>\
															<div class = "row posts">\
																	 ' + msg + ' \
															</div><br>\
															<div class = "row posts">\
																	 ' + ( p == 1 ?  '<img src = ' + posts_data[i].full_picture + ' style = width:280px />' : '' ) + '\
															</div>    \
												 </center><br>');
							 }

					});// End AJAX Success

					//AJAX Fail
					details
					.fail(function (jqXHR, status, err) {

							 $("#invalidAjax").fadeIn(1000);
							 $("#invalid").text(jqXHR.responseText); //display error message

					});//End AJAX Fail

		 }// End Function feedDetails



		 //function to get profile details
		 function getProfileDetails(){

					$("#myFeed").hide(1000);
					//Access Token
		 			var token = prompt("Enter an access token", " ");

					var personal = ["name" , "gender", "birthday", "email", "hometown", "location", "education"];//Storing aparameters in array
					var personalstr = personal.join();//converting array to string for passing through url

					// Ajax Call
					var details = $.ajax({

							 url: "https://graph.facebook.com/me?fields="+personalstr+"&access_token="+token,
							 //url: "https://graph.facebook.com/me?fields=id,first_name,last_name,gender,birthday,email,hometown,location,education,cover,picture.type%28large%29&access_token="+token,
							 type: "GET",
							 dataType: "json",

					});//End AJAX Call

					//AJAX Success
					details
					.done(function(data, status, jqXHR){

							 $("#invalidAjax").fadeOut(1000);
							 $("#myProfile").show(1000);

							 //looping through data and displaying coreespondingly
							 for( i = 0 ; i < personal.length ; i++ ){

										// If data unavailable
										if( data[personal[i]] == undefined || data[personal[i]] == null ){
												 $("#" + personal[i]).text("No data available");
										}

										//display name of location
										else if( personal[i] == "hometown" || personal[i] == "location" ){
												 $("#" + personal[i]).text(data[personal[i]].name);
										}

										//educational details
										else if ( personal[i] == "education" ){

												 var education = data.education;
												 console.log(education);

												 education.map( function(x){

															//Graduation
															if ( x.type == "Graduate School" ){

																	 // if degree  unavailable
																	 if ( x.degree == undefined ||  x.degree == null ){
																				$("#gdegree").text("No Data Available");
																	 }
																	 else {
																				$("#gdegree").text(x.degree.name);
																	 }

																	 // if concentration unavailable
																	 if (  x.concentration == undefined ||  x.concentration == null ){
																				$("#gconc").text("No Data Available");
																	 }
																	 else {
																				$("#gconc").text(x.concentration[0].name);
																	 }

																	 // if year unavailable
																	 if (  x.year == undefined ||  x.year == null ){
																				$("#gyear").text("No Data Available");
																	 }
																	 else {
																				$("#gyear").text(x.year.name);
																	 }

																	 $("#gname").text(x.school.name);

															}

															//College
															if ( x.type == "College" ){

																	 // if concentration unavailable
																	 if (  x.concentration == undefined ||  x.concentration == null ){
																				$("#cconc").text("No Data Available");
																	 }
																	 else {
																				$("#cconc").text(x.concentration[0].name);
																	 }

																	 $("#cname").text(x.school.name);

															}

															//School
															if ( x.type == "High School" ){

																	 $("#sname").text(x.school.name);

															}

												 })

										}

										//display other personal details
										else{
												 $("#" + personal[i]).text(data[personal[i]]);
										}
							 }

					});// End AJAX Success

					//AJAX Fail
					details
					.fail(function (jqXHR, status, err) {

							 $("#invalidAjax").fadeIn(1000);
							 $("#invalid").text(jqXHR.responseText);

					});//End AJAX Fail

		 }//End function getProfileDetails

		 $("#profile").on("click", getProfileDetails);
		 $("#feed").on("click", getFeedDetails)

});//End document load
