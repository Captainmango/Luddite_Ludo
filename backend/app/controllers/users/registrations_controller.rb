class Users::RegistrationsController < Devise::RegistrationsController

    respond_to :html, :json


    def create
        nu_user = User.new
        nu_user.email = params["email"]
        nu_user.password = params["password"]
        nu_user.save
        render json: {nu_user_id: nu_user.id}
    end

end