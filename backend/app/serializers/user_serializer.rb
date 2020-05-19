class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email
  has_many :games

  attribute :id, if: Proc.new {|record, params|
    record.valid_password?(params[:password])}

  attribute :email, if: Proc.new {|record, params|
    record.valid_password?(params[:password])}

end
