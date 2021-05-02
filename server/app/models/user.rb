class User < ApplicationRecord
  has_many :query_strings
  has_many :favorites

  validates :name, uniqueness: true
  validates :email, uniqueness: true
end
