const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const knex = require('knex');
const { makeGoalsArray } = require('./goals.fixtures');

describe.only('Goals endpoint', () => {
	let db;
	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DATABASE_URL,
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());
	before('clean table', () => db('goals').truncate());
	afterEach('cleanup', () => db('goals').truncate());

  describe('GET /api/goals', () => {
    context('Given no goals', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app).get('/api/goals').expect(200, [])
      })
    })

    context('Given there are goals in the db', () => {
      const testGoals = makeGoalsArray();

      beforeEach('insert goals', () => {
        return db
          .into('goals')
          .insert(testGoals)
      })
      
      it('responds with 200 and all the goals', () => {
        return supertest(app)
          .get('/api/goals')
          .expect(200, testGoals)
      })
    })
  })



});
