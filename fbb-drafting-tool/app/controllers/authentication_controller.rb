class AuthenticationController < ApplicationController
    def login
        handle_login params[:email], params[:password]
    end
    
    
    private
    
    def login_params
        params.permit(:email, :password)
    end
end
