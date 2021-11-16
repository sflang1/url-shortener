Rails.application.routes.draw do
  root to: 'dashboard#index'

  get '/:shortened_url' => 'links#shorten', as: 'shorten'

  scope path: 'api' do
    use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope module: :api, path: 'api' do
    devise_for :users, controllers: {
      registrations: 'api/users/registrations'
    }, skip: [:sessions, :passwords]

    namespace :auth do
      resources :users, only: [] do
        collection do
          post 'me'
        end
      end

      resources :links, only: [:create] do
        collection do
          get 'mine'
        end
      end
    end
  end

  get '/*path' => 'dashboard#index'
end
