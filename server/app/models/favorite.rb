class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :query_string

  validates :query_string_id,
    uniqueness: { scope: [:user_id], message: 'ブックマーク済みです' }
end
