TRUNCATE goals;

INSERT INTO goals (goal_name, category, notes, post_date)
VALUES
('Brush Teeth', 'Health', 'brush teeth 2x per day', now()),
('Journal', 'Personal Growth', 'journal 2x per day', now()),
('Get 10k steps per day', 'Get Fit', 'walk around the park with the dog', now() - '10 days'::INTERVAL),
('Eat more veggies', 'Nutrition', 'add more veggie to every meal', now()),
('Study computer science', 'Learn a skill', 'study for one hour per day', now() - '9 days'::INTERVAL),
('Clean the house 1x per week', 'Be Productive', 'get to cleaning!', now() - '8 days'::INTERVAL),
('Get 8 hours of sleep per night', 'Sleep', 'go to bed by midnight', now() - '7 days'::INTERVAL),
('Meditate before bed', 'Mindfulness', 'meditate for 5 min per night', now() - '6 days'::INTERVAL);
