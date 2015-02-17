$(document).ready(function($) {
	
	$friends = $('#friends');
	$name = $('#name');
	$age = $('#age');
	$add = $('#add-friend');

	var friendTemplate = $('#friend-template').html();

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

	$friends.delegate('.editFriend', 'click', function(){
		var $li = $(this).closest('li');

		$li.find('input.name').val($li.find('span.name').html());
		$li.find('input.age').val($li.find('span.age').html());
		$li.addClass('edit');
	});

	$friends.delegate('.cancleEdit', 'click', function(){
		$(this).closest('li').removeClass('edit');
	});

	$friends.delegate('.saveFriend', 'click', function(){
		var $li = $(this).closest('li');
		var friend = {
			name: $li.find('input.name').val(),
			age: $li.find('input.age').val(),
		}

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernardo/friends/' + $(this).attr('data-id'),
			type: 'PUT',
			data: friend,
			success: function(friend){
				$li.find('span.name').html(friend.name);
				$li.find('span.age').html(friend.age);
				$li.removeClass('edit');
			},
			error: function(){
				alert("error updatin order");
			}
		});
		
	});
	
});