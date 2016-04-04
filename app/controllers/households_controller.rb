class HouseholdsController < ApplicationController

 def create
    @household = Household.new(household_params)

    if @household.save
      render json: @household
    else
      render json: @household.errors, status: :unprocessable_entity
    end
 end


 private

 def household_params
   v_attr = [:make, :model, :year, :license]
   p_attr = [:first, :last, :email, :age, :is_male, vehicles_attributes: v_attr]

   params
     .require(:household)
     .permit(:address, :zip, :city, :state, :nob, people_attributes: p_attr)
 end

end
