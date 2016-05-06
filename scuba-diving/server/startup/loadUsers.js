Meteor.startup(function() {
	if(Meteor.users.find().count() === 0)
	{

		var id = Accounts.createUser({
			username: 'admin',
			password: '123456',
			profile: {name: 'Admin', surname: 'Surname'}
		});

		if(Meteor.users.find().count !==0)
		{
			console.log('New admin created!');
		}
	}
});