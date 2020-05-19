class Users::SessionsController < Devise::SessionsController

    respond_to :html, :json


    def create
        user = User.find_by(email: params["email"])
        if !!user
            if user.valid_password?(params["password"])
                render json: UserSerializer.new(user, {params:{password: params["password"]}}).serialized_json
            else
                render json: UserSerializer.new(user, {params:{password: params["password"]}}).serialized_json
            end
        else
            render json: UserSerializer.new(user, {params:{password: params["password"]}}).serialized_json
        end
    end


end