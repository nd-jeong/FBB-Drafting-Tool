class CreateTeamPlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :team_players do |t|
      t.string :first_name
      t.string :last_name
      t.string :position
      t.decimal :points
      t.decimal :assists
      t.decimal :rebounds
      t.decimal :threes
      t.decimal :field_goal_pct
      t.decimal :free_throw_pct
      t.decimal :steals
      t.decimal :blocks
      t.decimal :turnovers
      t.references :team, foreign_key: true

      t.timestamps
    end
  end
end
