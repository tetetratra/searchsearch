# == Schema Information
#
# Table name: constructed_url_query_strings
#
#  id                  :bigint           not null, primary key
#  value               :string(255)
#  constructed_url_id  :bigint
#  query_string_key_id :bigint
#
# Indexes
#
#  index_constructed_url_query_strings_on_constructed_url_id   (constructed_url_id)
#  index_constructed_url_query_strings_on_query_string_key_id  (query_string_key_id)
#
class ConstructedUrlQueryString < ApplicationRecord
  belongs_to :constructed_url
  belongs_to :query_string_key
end
