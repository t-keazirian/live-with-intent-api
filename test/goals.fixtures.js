function makeGoalsArray() {
	return (
		{
			id: 1,
			goal_name: 'Brush Teeth',
			category: 'Health',
			notes: 'brush teeth 2x per day',
		},
		{
			id: 2,
			goal_name: 'Journal',
			category: 'Personal Growth',
			notes: 'journal 2x per day',
		},
		{
			id: 3,
			goal_name: 'Take a walk',
			category: 'Get Fit',
			notes: 'walk around the park with the dog',
		},
		{
			id: 4,
			goal_name: 'Eat more veggies',
			category: 'Get Fit',
			notes: 'add more veggies to every meal',
		},
		{
			id: 5,
			goal_name: 'Study computer science',
			category: 'Learn a skill',
			notes: 'study for 20 min per day',
		}
	);
}

module.exports = { makeGoalsArray };
