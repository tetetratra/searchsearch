# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_30_013847) do

  create_table "constructed_url_query_strings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "constructed_url_id"
    t.bigint "query_string_key_id"
    t.string "value"
    t.index ["constructed_url_id"], name: "index_constructed_url_query_strings_on_constructed_url_id"
    t.index ["query_string_key_id"], name: "index_constructed_url_query_strings_on_query_string_key_id"
  end

  create_table "constructed_urls", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "path_id"
    t.string "memo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["path_id"], name: "index_constructed_urls_on_path_id"
    t.index ["user_id"], name: "index_constructed_urls_on_user_id"
  end

  create_table "paths", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "query_string_descriptions", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "query_string_key_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["query_string_key_id"], name: "index_query_string_descriptions_on_query_string_key_id"
    t.index ["user_id"], name: "index_query_string_descriptions_on_user_id"
  end

  create_table "query_string_keys", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "path_id"
    t.string "key"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["path_id"], name: "index_query_string_keys_on_path_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
