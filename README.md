# URL Shortener

I used Doorkeeper and Devise gem to provide authentication. It allows for a Oauth2 authentication, but if you want to reproduce it in your environment, you would need to change the config.js file and set it with your own Auth client. The process is as follows:

## Development deployment
1. Copy `.env.example` to `.env` and set your own development DB configurations
2. Run `rake db:create && rake db:migrate && rake db:seed`
3. A client record will be created through the seeds. Find it `Doorkeeper::Application.first` and replace the uid and secret of this record in the file `config.js` for `client_id` and `client_secret` respectively.
4. `rails server`