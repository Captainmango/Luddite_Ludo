class Users::SessionsController < Devise::SessionsController

    respond_to :html, :js


    def create

    end

    def destroy
        render json: {nu_user_id: nil}.to_json
    end

end