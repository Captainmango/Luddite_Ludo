class TurnsSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :game_id, :colour, :pawn, :roll
  belongs_to :game
end
