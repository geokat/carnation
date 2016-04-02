class CreateHouseholds < ActiveRecord::Migration
  def change
    create_table :households do |t|
      t.string :address
      t.string :zip
      t.string :city
      t.string :state
      t.integer :nob

      t.timestamps null: false
    end
  end
end
