Rails.application.routes.draw do
  root to: 'dashboard#index'

  use_doorkeeper
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope module: :api, path: 'api' do
    devise_for :users, controllers: {
      registrations: 'api/users/registrations'
    }
  end

  get '/*path' => 'dashboard#index'
end
