const GoalsService = {

  getAllGoals(knex) {
    return knex
      .select('*')
      .from('goals')
  },

  insertGoal(knex, newGoal) {
    return knex
      .insert(newGoal)
      .into('goals')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getGoalById(knex, id) {
    return knex
      .from('goals')
      .select('*')
      .where('id', id)
      .first()
  },

  getGoalsByCategory(knex, category) {
    return knex
      .from('goals')
      .select('*')
      .where('category', category)
  },

  deleteGoal(knex, id) {
    return knex
      .from('goals')
      .where({id})
      .delete()
  },

  updateGoal(knex, id, newGoalFields) {
    return knex
      .from('goals')
      .where({id})
      .update(newGoalFields)
  }

}

module.exports = GoalsService;