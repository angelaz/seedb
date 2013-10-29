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

ActiveRecord::Schema.define(version: 20131029043508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contributions", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "donations", id: false, force: true do |t|
    t.string  "cmte_id",           limit: 9
    t.string  "cand_id",           limit: 9
    t.string  "cand_nm",           limit: 50
    t.string  "contbr_nm",         limit: 70
    t.string  "contbr_city",       limit: 40
    t.string  "contbr_st",         limit: 2
    t.string  "contbr_zip",        limit: 9
    t.string  "contbr_employer",   limit: 100
    t.string  "contbr_occupation", limit: 100
    t.decimal "contb_receipt_amt",             precision: 19, scale: 2
    t.date    "contb_receipt_dt"
    t.text    "receipt_desc"
    t.text    "memo_cd"
    t.text    "memo_text"
    t.string  "form_tp",           limit: 5
    t.string  "file_num",          limit: 6
    t.string  "tran_id",           limit: 50
    t.string  "election_tp",       limit: 5
  end

end
