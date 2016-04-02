class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.belongs_to :person, index: true
      t.string :make
      t.string :model
      t.integer :year
      t.string :license

      t.timestamps null: false
    end
    add_foreign_key :vehicles, :people
  end
end
