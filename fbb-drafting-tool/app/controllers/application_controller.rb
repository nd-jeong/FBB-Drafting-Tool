class ApplicationController < ActionController::API
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
            @decoded = JsonWebToken.decode(header)
            @current_user = User.find(@decoded[:user_id])
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
            render json: { errors: e.message }, status: :unauthorized
        end
    end

    def handle_login(email, password)
        @user = User.find_by_email(email)
            if @user.authenticate(password) #authenticate method provided by Bcrypt and 'has_secure_password'
                token = JsonWebToken.encode(user_id: @user.id, email: @user.email)
                render json: { token: token }, status: :ok
            else
                render json: { error: 'unauthorized' }, status: :unauthorized
            end
        end
    end

