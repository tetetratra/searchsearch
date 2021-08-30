class InitializeSchema < ActiveRecord::Migration[6.1]
  def change
    create_table :paths do |t|
      t.string :name
      t.timestamps
    end

    create_table :query_string_keys do |t|
      t.references :path

      t.string :key
      t.timestamps
    end

    create_table :query_string_descriptions do |t|
      t.references :user
      t.references :query_string_key

      t.string :description
      t.timestamps
    end

    create_table :constructed_urls do |t|
      t.references :user
      t.references :path

      t.string :memo
      t.timestamps
    end

    create_table :constructed_url_query_strings do |t|
      t.references :constructed_url
      t.references :query_string_key

      t.string :value
    end
  end
end
