class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :query_strings
  has_many :favorites

  validates :name, uniqueness: true
  validates :email, uniqueness: true
end
