class Api::Auth::AuthController < Api::ApiController
  before_action   :doorkeeper_authorize!
end