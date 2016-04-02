class WizardController < ApplicationController
  def index
    @households = Household.all
  end
end
