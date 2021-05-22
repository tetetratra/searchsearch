class CreateQueryStrings < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps

      t.index :name, unique: true
      t.index :email, unique: true
    end

    create_table :query_strings do |t|
      t.references :user
      t.string :path, null: false
      t.string :key, null: false
      t.text :description, null: false
      t.timestamps
    end

    create_table :favorites do |t|
      t.references :user
      t.references :query_strings
    end
  end
end
