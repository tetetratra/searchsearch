class CreateQueryStrings < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.timestamps
    end

    create_table :urls do |t|
      t.string :path, null: false
      t.timestamps
    end

    create_table :query_strings do |t|
      t.references :url
      t.references :user
      t.string :key, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
