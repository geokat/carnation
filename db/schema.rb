# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160402145623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "households", force: :cascade do |t|
    t.string   "address"
    t.string   "zip"
    t.string   "city"
    t.string   "state"
    t.integer  "nob"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.integer  "household_id"
    t.string   "first"
    t.string   "last"
    t.string   "email"
    t.integer  "age"
    t.boolean  "is_male"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "people", ["household_id"], name: "index_people_on_household_id", using: :btree

  create_table "vehicles", force: :cascade do |t|
    t.integer  "person_id"
    t.string   "make"
    t.string   "model"
    t.integer  "year"
    t.string   "license"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "vehicles", ["person_id"], name: "index_vehicles_on_person_id", using: :btree

  add_foreign_key "vehicles", "people"
end
