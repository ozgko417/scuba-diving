//default role for user 
Accounts.onCreateUser(function(options, user){
	if(options.profile)
	{
		var AdminRoles = ['logbook', 'activity', 'role'];

		if(user.username === "admin")
			user.roles = AdminRoles;
		else
		{
			user.roles = ['logbook'];
			options.profile.level = 'l0';
		}
		user.profile = options.profile;
	}

	return user;
});