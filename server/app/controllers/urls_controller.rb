class UrlsController < ApplicationController
  def index
    if params[:path]
      urls = Url.where('path LIKE ?', "%#{params[:path]}%")
    else
      urls = Url.all
    end
    render json: urls
  end

  def show
    path = URI.parse(request.url).path
             .gsub(%r{^/urls/}, '')
             .then(&URI.method(:decode_www_form_component))
    if url = Url.find_by(path: path)
      render json: {
        id: url.id,
        query_strings: url.query_strings
      }
    else
      render json: {
        id: nil,
        query_strings: []
      }
    end
  end

  def create
    url = Url.new(path: params[:path])
    if url.save
      render json: url, status: :ok
    else
      render json: { error: url.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

end
