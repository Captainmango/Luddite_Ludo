class CreateTurns < ActiveRecord::Migration[5.2]
  def change
    create_table :turns do |t|
      t.belongs_to :game
      t.string :colour
      t.string :pawn
      t.integer :roll
      t.timestamps
    end
  end
end
