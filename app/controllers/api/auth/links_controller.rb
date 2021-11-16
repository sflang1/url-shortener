module Api
  module Auth
    class LinksController < AuthController
      skip_before_action      :doorkeeper_authorize!, only: [:create]

      def mine
        links = Link.where(user_id: current_resource_owner.id)

        render_success(::Presenters::ApiPresenter.format(links))
      end

      def create
        link = Link.create(link_params)

        if link.persisted?
          render_success(::Presenters::ApiPresenter.format(link))
        else
          raise BadRequest.new(link.errors.full_messages)
        end
      end

      private
      def link_params
        updated_params = params.require(:link).permit(:original_url)

        updated_params[:user_id] = current_resource_owner.id if current_resource_owner
        updated_params
      end
    end
  end
end