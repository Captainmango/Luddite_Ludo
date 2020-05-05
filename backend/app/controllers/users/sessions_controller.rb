class Users::SessionsController < Devise::SessionsController

    respond_to :html, :json


    def create
        user = User.find_by(email: params["email"])
        if !!user
            if user.valid_password?(params["password"])
                render json: {user_id: user.id}.to_json
            else
                render json: {user_id: nil}.to_json
            end
        else
            render json: {user_id: nil}.to_json
        end
    end


    def destroy
        render json: {user_id: nil}.to_json
    end

end