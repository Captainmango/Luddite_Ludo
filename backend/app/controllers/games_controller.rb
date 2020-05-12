class GamesController < ApplicationController
    before_action :get_game, only: [:show, :destroy]
    respond_to :html, :json

    def index
        games = Game.where(user_id: params['user_id'])
        render json: games.to_json
    end

    def create
        game = Game.create(user_id: params['user_id'])
        game.save
        render json: {game_id: game.id, user_id: game.user_id}.to_json
    end

    def show
        last_turn = game.turns.last
        render json: {game: game, last_turn: last_turn}.to_json
    end

    def destroy
        Turn.where(game_id: game.id).destroy_all
        game.destroy
        render json: {}.to_json
    end

    def get_game
        game = Game.find_by_id(params['game_id'])
    end


end
