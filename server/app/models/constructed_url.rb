# == Schema Information
#
# Table name: constructed_urls
#
#  id         :bigint           not null, primary key
#  memo       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  path_id    :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_constructed_urls_on_path_id  (path_id)
#  index_constructed_urls_on_user_id  (user_id)
#
class ConstructedUrl < ApplicationRecord
  belongs_to :path
  belongs_to :user

  has_many :constructed_url_query_strings
end
