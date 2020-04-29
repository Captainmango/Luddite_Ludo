class Users::RegistrationsController < Devise::RegistrationsController

    respond_to :html, :js


    def create
        nu_user = User.new
        nu_user.email = params["email"]
        nu_user.password = params["password"]
        nu_user.save
    end

end