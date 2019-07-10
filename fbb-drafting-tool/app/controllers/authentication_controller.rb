class AuthenticationController < ApplicationController
    def login
        handle_login params[:email], params[:password]
    end
end
