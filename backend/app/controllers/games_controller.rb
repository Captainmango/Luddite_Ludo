class GamesController < ApplicationController

    respond_to :html, :json

    def index

    end

    def create
        game = Game.create(user_id: params['current_user'])
        game.save
        render :json {game_id: game.id, user_email: User.find_by_id(game.user_id).email, user_id: game.user_id}
    end

    def show
        game = Game.find_by_id(params['game_id'])
        game_turns = game.turns
    end

    def destroy

    end


end
