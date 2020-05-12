# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

colours = ["red", "blue", "yellow", "green"]

user1 = User.create(email: "test1@test.com", password: "123456789")
user1.save
user2 = User.create(email: "test2@test.com", password: "123456789")
user2.save
user3 = User.create(email: "test3@test.com", password: "123456789")
user3.save
user4 = User.create(email: "test4@test.com", password: "123456789")
user4.save

nu_game1 = user1.games.new
nu_game1.save

20.times do
    nu_game1.turns.create(colour: colours[0], token: "#{colours[0]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game1.turns.create(colour: colours[1], token: "#{colours[1]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game1.turns.create(colour: colours[2], token: "#{colours[2]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game1.turns.create(colour: colours[3], token: "#{colours[3]}pawn#{rand(1..4)}", roll: rand(1..6))
end

nu_game2 = user1.games.new
nu_game2.save

20.times do
    nu_game2.turns.create(colour: colours[0], token: "#{colours[0]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game2.turns.create(colour: colours[1], token: "#{colours[1]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game2.turns.create(colour: colours[2], token: "#{colours[2]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game2.turns.create(colour: colours[3], token: "#{colours[3]}pawn#{rand(1..4)}", roll: rand(1..6))
end

nu_game3 = user1.games.new
nu_game3.save

20.times do
    nu_game3.turns.create(colour: colours[0], token: "#{colours[0]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game3.turns.create(colour: colours[1], token: "#{colours[1]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game3.turns.create(colour: colours[2], token: "#{colours[2]}pawn#{rand(1..4)}", roll: rand(1..6))
    nu_game3.turns.create(colour: colours[3], token: "#{colours[3]}pawn#{rand(1..4)}", roll: rand(1..6))
end
        