class CreateLeagues < ActiveRecord::Migration[5.2]
  def change
    create_table :leagues do |t|
      t.string :league_name
      t.integer :num_teams
      t.integer :num_players
      t.integer :pg_num
      t.integer :g_num
      t.integer :sg_num
      t.integer :sf_num
      t.integer :f_num
      t.integer :pf_num
      t.integer :c_num
      t.integer :util_num
      t.integer :bench_num
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
