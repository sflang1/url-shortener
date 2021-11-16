module Api
  module Auth
    class UsersController < AuthController
      def me
        render_success(::Presenters::ApiPresenter.format(current_resource_owner))
      end
    end
  end
end