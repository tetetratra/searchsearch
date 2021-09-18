class PathsController < ApplicationController
  skip_before_action :auth_user, only: [:index, :show]

  def index
    q = params[:q]
    paths = Path.all.then { |r| q ? r.where('name LIKE ?', "%#{q}%") : r }.page(params[:page]).per(100)

    render json: paths
  end

  def show
    path = Path.includes(query_string_keys: :query_string_descriptions).find_by(name: params[:path])

    merged_path = path.as_json.merge(
        query_string_keys: path.query_string_keys.map { |query_string_key|
          query_string_key.as_json.merge(
            query_string_descriptions: query_string_key.query_string_descriptions
          )
        }
      )
    render json: merged_path
  end
end

