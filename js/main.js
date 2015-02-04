$(document).ready(function($) {
	
	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');
	var $add = $('#add-friend');

	function addFriend(friend){
		$friends.append('<li>Name: '+friend.name+', Age: '+friend.age+'</li>');
	}

	$.ajax({
		url: 'http://rest.learncode.academy/api/beni/friends',
		type: 'GET',
		success: function(friends){
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},
		error: function() {
			alert('error loading orders');
		}
	});
	
	$add.on('click', function(){

		var friend = {
			name: $name.val(),
			age: $age.val(),
		};

		$.ajax({
			url: 'http://rest.learncode.academy/api/beni/friends',
			type: 'POST',
			data: friend,
			success: function(friends){
				addFriend(friends);
			},
			error: function(){
				alert('error saving friends');
			}
		});
	});
	
	
});