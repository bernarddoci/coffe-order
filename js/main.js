$(document).ready(function($) {
	
	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');
	var $add = $('#add-friend');
	// template to show data 
	var friendTemplate = $('#friend-template').html();

	function addFriends(friend){
		$friends.append(Mustache.render(friendTemplate, friend));
	}
	// ajax to get data
	$.ajax({
		url: 'http://rest.learncode.academy/api/bernard/friends',
		type: 'GET',
		success: function(friends){
			$.each(friends, function(i, friend){
				addFriends(friend);
			});
		},
		error: function(){
			alert("Can't access API");
		}
	});
	// ajax to post data
	$add.on('click', function(){
		var friend = {
			name: $name.val(),
			age: $age.val(),
		}

		$.ajax({
			url: 'http://rest.learncode.academy/api/bernard/friends',
			type: 'POST',
			data: friend,
			success: function(newFriend){
				addFriends(friend);
			},
			error: function(){
				alert("Can't add friend right now");
			}
		});
		
	});
	// delete data
	$friends.delegate('.remove', 'click', function(){
		var $li = $(this).closest('li');
		$.ajax({
			url: 'http://rest.learncode.academy/api/bernard/friends/' + $(this).attr('data-id'),
			type: 'DELETE',
			success: function(){
				$li.fadeOut(200, function(){
					$(this).remove();
				});
			},
			error: function(){
				alert("Can't delete, wrong path");
			}
		});
		
	});
	// edit data
	$friends.delegate('.editFriend', 'click', function(){
		var $li = $(this).closest('li');
		$li.find('input.name').val($li.find('span.name').html());
		$li.find('input.age').val($li.find('span.age').html());
		$li.addClass('edit');
	});
	// cancel data after edit
	$friends.delegate('.cancelEdit', 'click', function(){
		$(this).closest('li').removeClass('edit');
	});
	// save data after edit
	$friends.delegate('.saveFriend', 'click', function(){
		var $li = $(this).closest('li');
		var friend = {
			name: $li.find('input.name').val(),
			age: $li.find('input.age').val(),
		};
		$.ajax({
			url: 'http://rest.learncode.academy/api/bernard/friends/' + $li.attr('data-id'),
			type: 'PUT',
			data: friend,
			success: function(newFriend){
				$li.find('span.name').html(friend.name);
				$li.find('span.age').html(friend.age);
				$li.removeClass('edit');
			}
		});
		
	});

});