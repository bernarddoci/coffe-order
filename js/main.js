$(document).ready(function($) {
	
	$friends = $('#friends');
	$name = $('#name');
	$age = $('#age');
	$add = $('#add-friend');

	var friendTemplate = ""+
	"<li>" +
	"<p><strong>Name: </strong>{{name}}</p>"+
	"<p><strong>Age: </strong>{{age}}</p>"+
	"<button data-id={{id}} class='remove'>Remove</button>"+
	"</li>";

	function showFriends(friend){
		$friends.append(Mustache.render(friendTemplate, friend));
	}

	$.ajax({
		url: 'http://rest.learncode.academy/api/bernardo/friends',
		type: 'GET',
		success: function(friends){
			$.each(friends, function(i, friend) {
				showFriends(friend);
			});
		},
		error: function(){
			alert("Error Loading Page");
		}
	});

	$add.on('click', function(){

		var friends = {
			name: $name.val(),
			age: $age.val(),
		};

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernardo/friends',
			type: 'POST',
			data: friends,
			success: function(friends){
				showFriends(friends);
			}
		});

	});

	$friends.delegate('.remove','click', function(){

		var $li = $(this).closest('li');

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernardo/friends/'+$(this).attr('data-id'),
			type: 'DELETE',
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});

			}
		});
	});




	
});