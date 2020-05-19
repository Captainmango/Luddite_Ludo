class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :created_at
  belongs_to :user
  has_many :turns
end
