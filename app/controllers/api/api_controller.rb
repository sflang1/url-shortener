module Api
  class ApiController < ActionController::API
    before_action :configure_permitted_parameters, if: :devise_controller?

    respond_to    :json

    class BadRequest < StandardError; end
    class NotFound < StandardError; end

    rescue_from BadRequest,               with: :bad_request
    rescue_from NotFound,                 with: :not_found

    def render_success(data)
      render json: { success: true, data: data, message: '' }
    end

    def render_error(message, error_code)
      render json: { success: false, data: [], message: JSON.parse(message) }, status: error_code
    end

    def bad_request(exception)
      render_error(exception.message, 400)
    end

    def not_found(exception)
      render_error(exception.message, 404)
    end

    protected

    def configure_permitted_parameters
      added_attrs = [:email]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    end

    def current_resource_owner
      User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    end
  end
end