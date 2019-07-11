# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_09_144334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "available_players", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "position"
    t.decimal "points"
    t.decimal "assists"
    t.decimal "rebounds"
    t.decimal "threes"
    t.decimal "field_goal_pct"
    t.decimal "free_throw_pct"
    t.decimal "steals"
    t.decimal "blocks"
    t.decimal "turnovers"
    t.integer "games_played"
    t.bigint "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_available_players_on_league_id"
  end

  create_table "leagues", force: :cascade do |t|
    t.string "league_name"
    t.integer "num_teams"
    t.integer "num_players"
    t.integer "pg_num"
    t.integer "g_num"
    t.integer "sg_num"
    t.integer "sf_num"
    t.integer "f_num"
    t.integer "pf_num"
    t.integer "c_num"
    t.integer "util_num"
    t.integer "bench_num"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_leagues_on_user_id"
  end

  create_table "team_players", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "position"
    t.decimal "points"
    t.decimal "assists"
    t.decimal "rebounds"
    t.decimal "threes"
    t.decimal "field_goal_pct"
    t.decimal "free_throw_pct"
    t.decimal "steals"
    t.decimal "blocks"
    t.decimal "turnovers"
    t.integer "games_played"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_team_players_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "team_name"
    t.integer "draft_order"
    t.bigint "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_teams_on_league_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "available_players", "leagues"
  add_foreign_key "leagues", "users"
  add_foreign_key "team_players", "teams"
  add_foreign_key "teams", "leagues"
end
