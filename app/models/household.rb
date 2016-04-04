class Household < ActiveRecord::Base
  has_many :people
  has_many :vehicles, through: :people

  accepts_nested_attributes_for :people
end
