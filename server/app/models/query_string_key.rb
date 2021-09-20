# == Schema Information
#
# Table name: query_string_keys
#
#  id         :bigint           not null, primary key
#  key        :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  path_id    :bigint
#
# Indexes
#
#  index_query_string_keys_on_path_id  (path_id)
#
class QueryStringKey < ApplicationRecord
  belongs_to :path

  has_many :query_string_descriptions
  has_many :constructed_url_query_strings

  validates :key, presence: true, uniqueness: { scope: :path_id, case_sensitive: true }
end
