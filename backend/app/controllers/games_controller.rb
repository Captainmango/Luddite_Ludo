class GamesController < ApplicationController
    before_action :get_game, only: [:show]
    respond_to :html, :json

    def index
        games = Game.all
        render json: GameSerializer.new(games).serialized_json
    end

    def create
        game = Game.create(user_id: params['user_id'])
        game.save
        render json: GameSerializer.new(game).serialized_json
    end

    def destroy
        game = Game.find(params["id"])
        game.turns.destroy
        game.destroy
        render json: GameSerializer.new(game).serialized_json
    end

    def get_game
        game = Game.find_by_id(params['game_id'])
    end


end
