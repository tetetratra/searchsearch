class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :recoverable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  validates :name, presence: true

  has_many :query_string_descriptions
  has_many :constructed_urls
end
