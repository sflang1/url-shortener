module Api
  class ApiController < ActionController::API
    before_action :configure_permitted_parameters, if: :devise_controller?

    respond_to    :json

    protected

    def configure_permitted_parameters
      added_attrs = [:email]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    end
  end
end