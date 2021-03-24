module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL:
		process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/goals',
	TEST_DATABASE_URL:
		process.env.TEST_DATABASE_URL ||
		'postgresql://dunder_mifflin@localhost/goals-test',
	CLIENT_ORIGIN: 'https://live-with-intent.vercel.app/'
};
