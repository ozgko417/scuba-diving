//publish all levels
Meteor.publish("AllLevels", function(){
	return Levels.find();
});

//publish all activities for adding, editing and removing according to user role
Meteor.publish("AllActivities", function(options, search){

if (search == null) 
	{
		search = '';
	}

	var today = new Date();

	const selector = {
		'name' : {'$regex' : '.*' + search || '' + '.*', '$options' : 'i'},
		$or: [{
			$and: [
				{show: true},
				{show : {$exists: true}},
				{date : {$gte: today}}
			]
		}]
	};

	const selector_date = {
		$or: [{
			$and: [{date: {$gte: today}}]
		}]
	};

	if(Roles.userIsInRole(this.userId, ['activity']))
	{
		Counts.publish(this, 'numberOfActivities', Activities.find({
			'name' : {'$regex' : '.*' + search || '' + '.*', '$options' : 'i'}
		}), {noReady: true});

		return Activities.find({
			'name' : {'$regex' : '.*' + search || '' + '.*', '$options' : 'i'}
		},options);
	}
	else
	{
		Counts.publish(this, 'numberOfActivities', Activities.find(selector), {noReady: true});

		return Activities.find(selector, options);
	}
});

//publish all logbooks belongs to current user
Meteor.publish("AllLogbooks", function(options, search){
	if (search == null) 
	{
		search = '';
	}

	const selector = {
		'name' : {'$regex' : '.*' + search || '' + '.*', '$options' : 'i'},
		$or: [
			{$and: [
				{owner : this.userId},
				{owner : {$exists: true}}
			]}
		]
	};

	if(Roles.userIsInRole(this.userId, ['logbook']))
	{
		Counts.publish(this, 'numberOfLogbooks', Logbooks.find(selector), {noReady: true});

		return Logbooks.find(selector, options);
	}
});

//publish all user (not admin)
Meteor.publish("AllUsers", function(options, search){
	if (search == null) 
	{
		search = '';
	}

	const selector = {
		'profile.name' : {'$regex' : '.*' + search || '' + '.*', '$options' : 'i'}
	};

	if(Roles.userIsInRole(this.userId, ['role']))
	{
		Counts.publish(this, 'numberOfUsers', Meteor.users.find(selector), {noReady: true});

		return Meteor.users.find(selector, options);
	}
});

Meteor.publish("Profile", function(){
	return Meteor.users.find({_id: this.userId}, {fields: {profile: 1}});
});