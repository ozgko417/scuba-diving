Meteor.startup(function() {
	if(Levels.find().count() === 0)
	{
		
		var levels = [
			{ 'name' : "Visitor Level", 'value' : "l0" },
			{ 'name' : "INTRO-SSI Intro to Scuba", 'value' : "l1" },
        	{ 'name' : "KIDS-SSI Scuba Rangers", 'value' : "l2" },
        	{ 'name' : "LEVEL1-Open Water", 'value' : "l3" },
        	{ 'name' : "LEVEL2-Specialty Driver", 'value' : "l4" },
        	{ 'name' : "LEVEL3-SSI Advanced Open Water", 'value' : "l5" },
        	{ 'name' : "LEVEL4-SSI Master Driver", 'value' : "l6" },
        	{ 'name' : "LEVEL5-SSI Century Driver", 'value' : "l7" },
        	{ 'name' : "LEVEL6-SSI", 'value' : "l8" },
        	{ 'name' : "LEVEL7-SSI", 'value' : "l9" },
        	{ 'name' : "LEVEL8-SSI", 'value' : "l10" },
        	{ 'name' : "LEVEL9-SSI Gold 500 Diver", 'value' : "l11" },
        	{ 'name' : "LEVEL10-SSI Platinum 1000 Driver", 'value' : "l12" },
        	{ 'name' : "PRO-SSI Platinum 5000 Driver", 'value' : "l13" },
        	{ 'name' : "DIVECON-SSI Dive Control Speciallist", 'value' : "l14" },
        	{ 'name' : "INSTRUCTOR-SSI Open Water Instructor", 'value' : "l15" }
		];

		for (var i = 0; i < levels.length; i++) 
		{
			Levels.insert({
				name : levels[i].name, 
				value : levels[i].value
			});
		}

		if(Levels.find().count() !== 0)
			console.log('levels are created!');
	}
});