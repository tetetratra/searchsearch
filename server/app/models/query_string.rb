class QueryString < ApplicationRecord
  belongs_to :user, optional: true

  has_many :favorites

  validates :path, presence: true
  validates :key, presence: true
  validates :description,
    presence: { message: '説明を入力してください' },
    uniqueness: { scope: [:path, :key], message: '同一の説明が既に存在します' }
end
