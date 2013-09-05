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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130904185021) do

  create_table "calendars", :force => true do |t|
    t.string   "title"
    t.string   "color"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "events", :force => true do |t|
    t.string   "title"
    t.datetime "start_time"
    t.datetime "end_time"
    t.boolean  "all_day"
    t.string   "location"
    t.integer  "calendar_id"
    t.text     "description"
    t.string   "attachment"
    t.string   "color"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "events", ["calendar_id"], :name => "index_events_on_calendar_id"

  create_table "user_calendars", :force => true do |t|
    t.integer  "user_id"
    t.integer  "calendar_id"
    t.string   "permission_setting"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  add_index "user_calendars", ["calendar_id"], :name => "index_user_calendars_on_calendar_id"
  add_index "user_calendars", ["user_id", "calendar_id"], :name => "index_user_calendars_on_user_id_and_calendar_id", :unique => true
  add_index "user_calendars", ["user_id"], :name => "index_user_calendars_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.string   "session"
    t.string   "email_address"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
