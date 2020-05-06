# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

colours = ["red", "blue", "yellow", "green"]
turn = 1

user = User.create(email: "test@test.com", password: "123456789")
user.save

nu_game = user.games.new
nu_game.save

30.times do
    nu_game.turns.create(colour: colours[0], token: rand(1..4), roll: rand(1..6))
end
        