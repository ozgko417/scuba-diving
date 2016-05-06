var require = meteorInstall({"server":{"startup":{"loadModels.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/startup/loadModels.js                                                             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.startup(function () {                                                                // 1
	if (Levels.find().count() === 0) {                                                         // 2
                                                                                            //
		var levels = [{ 'name': "Visitor Level", 'value': "l0" }, { 'name': "INTRO-SSI Intro to Scuba", 'value': "l1" }, { 'name': "KIDS-SSI Scuba Rangers", 'value': "l2" }, { 'name': "LEVEL1-Open Water", 'value': "l3" }, { 'name': "LEVEL2-Specialty Driver", 'value': "l4" }, { 'name': "LEVEL3-SSI Advanced Open Water", 'value': "l5" }, { 'name': "LEVEL4-SSI Master Driver", 'value': "l6" }, { 'name': "LEVEL5-SSI Century Driver", 'value': "l7" }, { 'name': "LEVEL6-SSI", 'value': "l8" }, { 'name': "LEVEL7-SSI", 'value': "l9" }, { 'name': "LEVEL8-SSI", 'value': "l10" }, { 'name': "LEVEL9-SSI Gold 500 Diver", 'value': "l11" }, { 'name': "LEVEL10-SSI Platinum 1000 Driver", 'value': "l12" }, { 'name': "PRO-SSI Platinum 5000 Driver", 'value': "l13" }, { 'name': "DIVECON-SSI Dive Control Speciallist", 'value': "l14" }, { 'name': "INSTRUCTOR-SSI Open Water Instructor", 'value': "l15" }];
                                                                                            //
		for (var i = 0; i < levels.length; i++) {                                                 // 24
			Levels.insert({                                                                          // 26
				name: levels[i].name,                                                                   // 27
				value: levels[i].value                                                                  // 28
			});                                                                                      //
		}                                                                                         //
                                                                                            //
		if (Levels.find().count() !== 0) console.log('levels are created!');                      // 32
	}                                                                                          //
});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////

},"loadUsers.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/startup/loadUsers.js                                                              //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.startup(function () {                                                                // 1
	if (Meteor.users.find().count() === 0) {                                                   // 2
                                                                                            //
		var id = Accounts.createUser({                                                            // 5
			username: 'admin',                                                                       // 6
			password: '123456',                                                                      // 7
			profile: { name: 'Admin', surname: 'Surname' }                                           // 8
		});                                                                                       //
                                                                                            //
		if (Meteor.users.find().count !== 0) {                                                    // 11
			console.log('New admin created!');                                                       // 13
		}                                                                                         //
	}                                                                                          //
});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////

}},"accountrole.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/accountrole.js                                                                    //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
//default role for user                                                                     //
Accounts.onCreateUser(function (options, user) {                                            // 2
	if (options.profile) {                                                                     // 3
		var AdminRoles = ['logbook', 'activity', 'role'];                                         // 5
                                                                                            //
		if (user.username === "admin") user.roles = AdminRoles;else {                             // 7
			user.roles = ['logbook'];                                                                // 11
			options.profile.level = 'l0';                                                            // 12
		}                                                                                         //
		user.profile = options.profile;                                                           // 14
	}                                                                                          //
                                                                                            //
	return user;                                                                               // 17
});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////

},"modelsPublish.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// server/modelsPublish.js                                                                  //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
//publish all levels                                                                        //
Meteor.publish("AllLevels", function () {                                                   // 2
	return Levels.find();                                                                      // 3
});                                                                                         //
                                                                                            //
//publish all activities for adding, editing and removing according to user role            //
Meteor.publish("AllActivities", function (options, search) {                                // 7
                                                                                            //
	if (search == null) {                                                                      // 9
		search = '';                                                                              // 11
	}                                                                                          //
                                                                                            //
	var today = new Date();                                                                    // 14
                                                                                            //
	var selector = {                                                                           // 16
		'name': { '$regex': '.*' + search || '' + '.*', '$options': 'i' },                        // 17
		$or: [{                                                                                   // 18
			$and: [{ show: true }, { show: { $exists: true } }, { date: { $gte: today } }]           // 19
		}]                                                                                        //
	};                                                                                         //
                                                                                            //
	var selector_date = {                                                                      // 27
		$or: [{                                                                                   // 28
			$and: [{ date: { $gte: today } }]                                                        // 29
		}]                                                                                        //
	};                                                                                         //
                                                                                            //
	if (Roles.userIsInRole(this.userId, ['activity'])) {                                       // 33
		Counts.publish(this, 'numberOfActivities', Activities.find({                              // 35
			'name': { '$regex': '.*' + search || '' + '.*', '$options': 'i' }                        // 36
		}), { noReady: true });                                                                   //
                                                                                            //
		return Activities.find({                                                                  // 39
			'name': { '$regex': '.*' + search || '' + '.*', '$options': 'i' }                        // 40
		}, options);                                                                              //
	} else {                                                                                   //
		Counts.publish(this, 'numberOfActivities', Activities.find(selector), { noReady: true });
                                                                                            //
		return Activities.find(selector, options);                                                // 47
	}                                                                                          //
});                                                                                         //
                                                                                            //
//publish all logbooks belongs to current user                                              //
Meteor.publish("AllLogbooks", function (options, search) {                                  // 52
	if (search == null) {                                                                      // 53
		search = '';                                                                              // 55
	}                                                                                          //
                                                                                            //
	var selector = {                                                                           // 58
		'name': { '$regex': '.*' + search || '' + '.*', '$options': 'i' },                        // 59
		$or: [{ $and: [{ owner: this.userId }, { owner: { $exists: true } }] }]                   // 60
	};                                                                                         //
                                                                                            //
	if (Roles.userIsInRole(this.userId, ['logbook'])) {                                        // 68
		Counts.publish(this, 'numberOfLogbooks', Logbooks.find(selector), { noReady: true });     // 70
                                                                                            //
		return Logbooks.find(selector, options);                                                  // 72
	}                                                                                          //
});                                                                                         //
                                                                                            //
//publish all user (not admin)                                                              //
Meteor.publish("AllUsers", function (options, search) {                                     // 77
	if (search == null) {                                                                      // 78
		search = '';                                                                              // 80
	}                                                                                          //
                                                                                            //
	var selector = {                                                                           // 83
		'profile.name': { '$regex': '.*' + search || '' + '.*', '$options': 'i' }                 // 84
	};                                                                                         //
                                                                                            //
	if (Roles.userIsInRole(this.userId, ['role'])) {                                           // 87
		Counts.publish(this, 'numberOfUsers', Meteor.users.find(selector), { noReady: true });    // 89
                                                                                            //
		return Meteor.users.find(selector, options);                                              // 91
	}                                                                                          //
});                                                                                         //
                                                                                            //
Meteor.publish("Profile", function () {                                                     // 95
	return Meteor.users.find({ _id: this.userId }, { fields: { profile: 1 } });                // 96
});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////

}},"model":{"models.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// model/models.js                                                                          //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
//levels for divers                                                                         //
Levels = new Mongo.Collection("levels");                                                    // 2
                                                                                            //
//atributes: name, description, place, date, time                                           //
Activities = new Mongo.Collection("activities");                                            // 5
                                                                                            //
Activities.allow({                                                                          // 7
	remove: function remove(userId, activity) {                                                // 8
		if (Roles.userIsInRole(userId, ['activity']) && activity.owner === userId) return true;   // 10
	},                                                                                         //
                                                                                            //
	insert: function insert(userId, activity) {                                                // 14
		if (Roles.userIsInRole(userId, ['activity']) && activity.owner === userId) return true;   // 16
	},                                                                                         //
                                                                                            //
	update: function update(userId, activity) {                                                // 20
		if (Roles.userIsInRole(userId, ['activity']) && activity.owner === userId) return true;   // 22
	}                                                                                          //
});                                                                                         //
                                                                                            //
//atributes: name, body, date, time, Duration ...                                           //
Logbooks = new Mongo.Collection("logbooks");                                                // 29
                                                                                            //
Logbooks.allow({                                                                            // 31
	remove: function remove(userId, logbook) {                                                 // 32
		if (Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId) return true;     // 34
	},                                                                                         //
                                                                                            //
	insert: function insert(userId, logbook) {                                                 // 38
		if (Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId) return true;     // 40
	},                                                                                         //
                                                                                            //
	update: function update(userId, logbook) {                                                 // 44
		if (Roles.userIsInRole(userId, ['logbook']) && logbook.owner === userId) return true;     // 46
	}                                                                                          //
});                                                                                         //
                                                                                            //
Meteor.users.allow({                                                                        // 51
	update: function update(userId) {                                                          // 52
		//for changing role                                                                       //
		if (Roles.userIsInRole(userId, ['role'])) return true;                                    // 55
                                                                                            //
		//for editing profile                                                                     //
		if (Meteor.userId() === userId) return true;                                              // 59
	}                                                                                          //
});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./server/startup/loadModels.js");
require("./server/startup/loadUsers.js");
require("./model/models.js");
require("./server/accountrole.js");
require("./server/modelsPublish.js");
//# sourceMappingURL=app.js.map
