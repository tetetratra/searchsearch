class QueryString < ApplicationRecord
  belongs_to :user
  belongs_to :url

  validates :key, presence: true
  validates :description, presence: true
end
