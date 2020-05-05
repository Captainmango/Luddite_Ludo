class Users::RegistrationsController < Devise::RegistrationsController

    respond_to :html, :json


    def create
        nu_user = User.find_or_create_by(email: params["email"])
        if nu_user.valid?
            render json: {nu_user_id: nu_user.id}
        else
            nu_user.password = params["password"]
            nu_user.save
            render json: {nu_user_id: nu_user.id,
                            errors: nu_user.errors}
        end

    end

end