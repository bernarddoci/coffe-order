$(document).ready(function($) {
	
	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');

	$.ajax({
		url: 'http://rest.learncode.academy/api/berni/friends',
		type: 'GET',
		success: function(friends){
			$.each(friends, function(i, friend){
				$friends.append('<li>Name: '+friend.name+' Age: '+friend.age+'</li>');
			});
		},
		error: function(){
			alert("Page not loaded");
		}
	});

	$('#add-friend').on('click', function(){
		
		var friend = {
			name: $name.val(),
			age: $age.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/berni/friends',
			data: friend,
			success: function(friend){
				$friends.append('<li>Name: '+friend.name+' Age: '+friend.age+'</li>');
			},
			error: function(){
				alert("not found");
			}
		})

	});
	
});