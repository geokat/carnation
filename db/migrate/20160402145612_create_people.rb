class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.belongs_to :household, index: true
      t.string :first
      t.string :last
      t.string :email
      t.integer :age
      t.integer :gender

      t.timestamps null: false
    end
    add_foreign_key :people, :households
  end
end
