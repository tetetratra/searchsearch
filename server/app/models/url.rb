class Url < ApplicationRecord
  has_many :query_strings

  validates :path, presence: true, uniqueness: true
end
