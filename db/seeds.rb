# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

households = [
  {address: "123 Oak St", zip: "95011", city: "Pineville", state: "IL", nob: 3},
  {address: "55 Hill St", zip: "24050", city: "Woodville", state: "MA", nob: 2},
  {address: "55 Hill St 546", zip: "14052", city: "Thornville", state: "TX", nob: 1},
]

Household.create(households)
