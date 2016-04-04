class Person < ActiveRecord::Base
  belongs_to :household
  has_many :vehicles

  accepts_nested_attributes_for :vehicles
end
