class QueryString < ApplicationRecord
  belongs_to :user

  has_many :favorites

  validates :path, presence: true
  validates :key, presence: true
  validates :description,
    presence: true,
    uniqueness: { scope: [:path, :key] }
end
