class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references :user
      t.references :query_strings
      t.timestamps
    end
  end
end
