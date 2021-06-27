class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references :user
      t.references :query_string
      t.timestamps
    end
  end
end
