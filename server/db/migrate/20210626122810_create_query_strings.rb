class CreateQueryStrings < ActiveRecord::Migration[6.1]
  def change
    create_table :query_strings do |t|
      t.references :user
      t.string :path, null: false
      t.string :key, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
