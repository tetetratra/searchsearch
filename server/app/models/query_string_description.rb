# == Schema Information
#
# Table name: query_string_descriptions
#
#  id                  :bigint           not null, primary key
#  description         :string(255)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  query_string_key_id :bigint
#  user_id             :bigint
#
# Indexes
#
#  index_query_string_descriptions_on_query_string_key_id  (query_string_key_id)
#  index_query_string_descriptions_on_user_id              (user_id)
#
class QueryStringDescription < ApplicationRecord
  belongs_to :user
  belongs_to :query_string_key

  validates :description, presence: true, uniqueness: { case_sensitive: true }
end
