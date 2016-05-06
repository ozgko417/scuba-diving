//levels for divers
Levels = new Mongo.Collection("levels");

//atributes: name, description, place, date, time
Activities = new Mongo.Collection("activities");

Activities.allow({
	remove: function(userId, activity)
	{
		if(Roles.userIsInRole(userId, ['activity']) && activity.owner === userId)
			return true;
	},
	
	insert: function(userId, activity)
	{
		if(Roles.userIsInRole(userId, ['activity']) && activity.owner === userId)
			return true;
	},
	
	update: function(userId, activity)
	{
		if(Roles.userIsInRole(userId, ['activity']) && activity.owner === userId)
			return true;
	}
});


//atributes: name, body, date, time, Duration ...
Logbooks = new Mongo.Collection("logbooks");

Logbooks.allow({
	remove: function(userId, logbook)
	{
		if(Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId)
			return true;
	},
	
	insert: function(userId, logbook)
	{
		if(Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId)
			return true;
	},
	
	update: function(userId, logbook)
	{
		if(Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId)
			return true;
	}
});

Meteor.users.allow({
	update: function(userId)
	{
		//for changing role
		if(Roles.userIsInRole(userId, ['role']))
			return true;

		//for editing profile
		if(Meteor.userId() === userId)
			return true;
	}
});