class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :recoverable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  validates :name, presence: true

  has_many :query_strings
  has_many :favorites, through: :query_strings
end
