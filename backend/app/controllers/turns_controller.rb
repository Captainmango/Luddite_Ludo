class TurnsController < ApplicationController
    before_action :get_game, only: [:index, :create]
    respond_to :html, :json

    def create
        turn = game.turns.create(colour: params['colour'], pawn: params['pawn'], roll: params['roll'])
        render :json {turn}.to_json
    end

    def index
        turns = game.turns
        render :json {turns}.to_json
    end

    def get_game
        game = Game.find_by_id(params['game_id'])
    end

end
