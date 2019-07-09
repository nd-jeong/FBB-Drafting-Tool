class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :team_name
      t.integer :draft_order
      t.references :league, foreign_key: true

      t.timestamps
    end
  end
end
