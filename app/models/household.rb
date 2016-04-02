class Household < ActiveRecord::Base
  has_many :people
  has_many :vehicles, through: :people
end
