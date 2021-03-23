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
				return supertest(app).get('/api/goals').expect(200, []);
			});
		});

		context('Given there are goals in the db', () => {
			const testGoals = makeGoalsArray();

			beforeEach('insert goals', () => {
				return db.into('goals').insert(testGoals);
			});

			it('responds with 200 and all the goals', () => {
				return supertest(app).get('/api/goals').expect(200, testGoals);
			});
		});
	});

	describe('POST /api/goals', () => {
		it('creates a goal, responding with 201 and the new goal', () => {

			const newGoal = {
				goal_name: 'New Goal',
				category: 'Learn a skill',
				notes: 'goal notes',
			};

			return supertest(app)
				.post('/api/goals')
				.send(newGoal)
				.expect(201)
				.expect(res => {
					expect(res.body.goal_name).to.eql(newGoal.goal_name);
					expect(res.body.category).to.eql(newGoal.category);
					expect(res.body.notes).to.eql(newGoal.notes);
					expect(res.body).to.have.property('id');
					expect(res.headers.location).to.eql(`/api/goals/${res.body.id}`);
				})
				.then(postRes => {
					supertest(app).get(`/api/goals/${postRes.body.id}`);
					expect(postRes.body);
				});
		});
	});

  describe('DELETE /api/goals/:id', () => {
    context('Given no goals', () => {
      it('responds with 404', () => {
        const id = 12345;
        return supertest(app)
          .delete(`/api/goals/${id}`)
          .expect(404, {error: {message: `Goal doesn't exist`}})
      })
    })

    context('Given there are goals in the db', () => {
      const testGoals = makeGoalsArray();

      beforeEach('insert goals', () => {
        return db
          .into('goals')
          .insert(testGoals)
      })

      it('responds with 204 and removes the goal', () => {
        const idToRemove = 2;
        const expectedGoals = testGoals.filter(goal => goal.id !== idToRemove)

        return supertest(app)
          .delete(`/api/goals/${idToRemove}`)
          .expect(204)
          .then(res => {
            supertest(app).get('/api/goals').expect(expectedGoals)
          })
      })

    })
  })

  describe('GET /api/goals/:id', () => {
    context('Given no goals', () => {
      it('responds with 404', () => {
        const id = 12345;
        return supertest(app)
          .get(`/api/goals/${id}`)
          .expect(404, {error: {message: `Goal doesn't exist`}})
      })
    })

    context('Given there are goals in the db', () => {
      const testGoals = makeGoalsArray();

      beforeEach('insert goals', () => {
        return db
          .into('goals')
          .insert(testGoals)
      })

      it('GET /api/goals/:id responds with 200 and the specified goal', () => {
        const id = 3;
        const expectedGoal = testGoals[id - 1]
        return supertest(app)
          .get(`/api/goals/${id}`)
          .expect(200, expectedGoal)
      })
    })
  })

  describe('PATCH /api/goals/:id', () => {
    context('Given no goals', () => {
      it('responds with 404', () => {
        const id = 12345;
        return supertest(app)
          .patch(`/api/goals/${id}`)
          .expect(404, {error: {message: `Goal doesn't exist`}})
      })
    })

    context('Given there are goals in the db', () => {
      const testGoals = makeGoalsArray();

      beforeEach('insert goals', () => {
        return db
          .into('goals')
          .insert(testGoals)
      })

      it('responds with 204 and the updated goal', () => {
        const idToUpdate = 1;
        const updatedGoal = {
          goal_name: 'Updated goal name'
        }
        const expectedGoal = {
          ...testGoals[idToUpdate - 1],
          ...updatedGoal
        }

        return supertest(app)
          .patch(`/api/goals/${idToUpdate}`)
          .send(updatedGoal)
          .expect(204)
          .then(res => {
            supertest(app).get(`/api/goals/${idToUpdate}`).expect(expectedGoal)
          })

      })
    })
  })



});
