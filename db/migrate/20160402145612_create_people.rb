class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.belongs_to :household, index: true
      t.string :first
      t.string :last
      t.string :email
      t.integer :age
      t.boolean :is_male

      t.timestamps null: false
    end
    add_foreign_key :people, :households
  end
end
