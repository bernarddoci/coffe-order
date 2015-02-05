$(document).ready(function($) {
	
	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');
	var $add = $('#add-friend');

	var friendTemplate = ""+
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</li></p>" +
	"<button data-id='{{id}}' class='remove'>X</button>" +
	"</li>"

	function addFriends(friend){
		$friends.append(Mustache.render(friendTemplate, friend));
	}

	$.ajax({
		url: 'http://rest.learncode.academy/api/bernardo/friends',
		type: 'GET',
		success: function(friends){
			$.each(friends, function(i, friend) {
				addFriends(friend);
			});
		},
		error: function(){
			alert("Error in connection!");
		}
	});

	$add.click(function(event) {
		
		var friends = {
			name: $name.val(),
			age: $age.val(),
		};

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernardo/friends',
			type: 'POST',
			data: friends,
			success: function(friends){
				addFriends(friends);
			}
		});
	});

	$friends.delegate('.remove','click', function(){

		var $li = $(this).closest('li');

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernardo/friends/' + $(this).attr('data-id'),
			type: 'DELETE',
			success: function(){
				$li.remove();
			}
		});
		

	});
	


	
});