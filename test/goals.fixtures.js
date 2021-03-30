function makeGoalsArray() {
	return [
		{
			id: 1,
			goal_name: 'Brush Teeth',
			category: 'Health',
			notes: 'brush teeth 2x per day',
			post_date: '2029-01-22T06:00:00.000Z',
		},
		{
			id: 2,
			goal_name: 'Journal',
			category: 'Personal Growth',
			notes: 'journal 2x per day',
			post_date: '2020-01-22T06:00:00.000Z',
		},
		{
			id: 3,
			goal_name: 'Take a walk',
			category: 'Get Fit',
			notes: 'walk around the park with the dog',
			post_date: '2021-04-22T05:00:00.000Z',
		},
		{
			id: 4,
			goal_name: 'Eat more veggies',
			category: 'Get Fit',
			notes: 'add more veggies to every meal',
			post_date: '2019-02-22T06:00:00.000Z',
		},
		{
			id: 5,
			goal_name: 'Study computer science',
			category: 'Learn a skill',
			notes: 'study for 20 min per day',
			post_date: '2012-03-22T05:00:00.000Z',
		},
	];
}

module.exports = { makeGoalsArray };
