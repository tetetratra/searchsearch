class PathsController < ApplicationController
  skip_before_action :auth_user, only: [:index, :show, :create]

  def index
    q = params[:q]
    fq = params[:fq] # formatted query
    paths = Path.then { |r|
        case [q, fq]
        in [nil, nil] then r.all
        in [_, nil] then r.where('name LIKE ?', "%#{q}%")
        in [nil, _] then r.where('name LIKE ?', "%#{fq}%")
        in [_, _] then r.where('name LIKE ? OR name LIKE ?', "%#{q}%", "%#{fq}%")
        end
      }
      .page(params[:page])
      .per(100)

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

  def create
    path = Path.new(name: params[:name])
    if path.save
      render json: nil, status: :ok
    else
      render json: { error: path.errors.full_messages }, status: :unprocessable_entity
    end
  end
end

