const express = require('express');
const path = require('path');
const GoalsService = require('./goals-service');

const goalsRouter = express.Router();
const jsonParser = express.json();

goalsRouter
	.route('/')
	.get((req, res, next) => {
		GoalsService.getAllGoals(req.app.get('db'))
			.then(goals => {
				res.json(goals);
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { goal_name, category, notes } = req.body;
		const newGoal = { goal_name, category, notes };

		if (!goal_name) {
			return res.status(404).json({
				error: { message: `Goal name is required` },
			});
		}

		if (!category) {
			return res.status(404).json({
				error: { message: `Category is required` },
			});
		}

		GoalsService.insertGoal(req.app.get('db'), newGoal)
			.then(goal => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${goal.id}`))
					.json(goal);
			})
			.catch(next);
	});

goalsRouter
	.route('/:id')
	.all((req, res, next) => {
		GoalsService.getGoalById(req.app.get('db'), req.params.id)
			.then(goal => {
				if (!goal) {
					return res.status(404).json({
						error: { message: `Goal doesn't exist` },
					});
				}
				res.goal = goal;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json({
			id: res.goal.id,
			goal_name: res.goal.goal_name,
      category: res.goal.category,
			notes: res.goal.notes,
		});
	})
	.delete((req, res, next) => {
		GoalsService.deleteGoal(req.app.get('db'), req.params.id)
			.then(() => {
				res.status(204).end();
			})
			.catch(next);
	})
	.patch(jsonParser, (req, res, next) => {
		const { goal_name, category, notes } = req.body;
		const goalToUpdate = { goal_name, category, notes };

		const numberOfVals = Object.values(goalToUpdate).filter(Boolean).length;

		if (numberOfVals === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain either 'goal_name', 'category', or 'notes'`,
				},
			});
		}

		GoalsService.updateGoal(req.app.get('db'), req.params.id, goalToUpdate)
			.then(() => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = goalsRouter;
