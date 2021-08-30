# == Schema Information
#
# Table name: paths
#
#  id         :bigint           not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Path < ApplicationRecord
  has_many :query_string_keys
  has_many :constructed_urls
end
