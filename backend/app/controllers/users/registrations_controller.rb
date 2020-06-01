class Users::RegistrationsController < Devise::RegistrationsController

    respond_to :html, :json


    def create
        nu_user = User.find_or_create_by(email: params["email"])
        if nu_user.valid?
            if nu_user.valid_password?(params["password"])
                render json: UserSerializer.new(nu_user, {params:{password: params["password"]}}).serialized_json
            else
                render json: UserSerializer.new(nu_user, {params:{password: params["password"]}}).serialized_json
            end
        else
            nu_user.password = params["password"]
            nu_user.save
            render json: UserSerializer.new(nu_user, {params:{password: params["password"]}}).serialized_json
        end

    end

    def destroy
        user = User.find_by_id(params['id'])
        user.destroy
        render json: UserSerializer.new(user).serialized_json
    end


end