class QueryStringsController < ApplicationController
  skip_before_action :auth_user, only: [:index, :create]

  def index
    queryStrings = QueryString
      .select(<<~SQL
        query_strings.*,
        users.name AS user_name,
        COUNT(favorites.id) AS favorite_count,
        COUNT(favorites.user_id = #{current_user&.id || 0} OR NULL) AS favorited,
        users.id = '#{current_user&.id}' AS owner
      SQL
      )
      .joins('LEFT OUTER JOIN users ON users.id = query_strings.user_id')
      .joins('LEFT OUTER JOIN favorites AS favorites ON favorites.query_string_id = query_strings.id')
      .then { |r|
        query = params[:query]
        query_like = params[:prefix] ? "#{query}%" : "%#{query}%"
        query ? r.where('path LIKE ?', query_like) : r
      }
      .then { |r|
        params[:author] ? r.where('users.name = ?', params[:author]) : r
      }
      .then { |r|
        case params[:sort]
        when 'star' then r.order(favorite_count: :DESC)
        when 'new' then r.order(:created_at)
        when 'old' then r.order(created_at: :desc)
        else r.order(favorite_count: :DESC)
        end
      }
      .then { |r|
        author = params[:author]
        author ? r.where('users.name = ?', author) : r
      }
      .group('query_strings.id')
      .then { |r|
        params[:star] ? r.having('favorited != 0') : r
      }
      .page(params[:page]).per(100)
    render json: queryStrings # TODO 返す値を絞る
  end

  def create
    query_string = if current_user
      current_user.query_strings.new(query_strings_params)
    else
      QueryString.new(query_strings_params.merge({user_id: nil}))
    end

    if query_string.save
      render json: nil, status: :ok
    else
      render json: { error: query_string.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if qs = current_user.query_strings.find_by(id: params[:id])
      ApplicationController.transaction do
        qs.destroy!
        qs.favorites.each(&:destroy!)
      end
    end
    render json: nil, status: :ok
  end

  private

  def query_strings_params
    params.permit(
      :path,
      :key,
      :description
    )
  end
end

