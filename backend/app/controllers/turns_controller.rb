class TurnsController < ApplicationController

    respond_to :html, :json

    def create
        turn = Turn.create()
    end

    def index

    end

end
