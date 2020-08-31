class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    render json: @trainers
  end

  def update
    @trainer = Trainer.find(params[:id])
    trainer.update!(trainer_params)
    render json: @trainer
  end

  private
  def trainer_params
    params.require(:trainer).permit!
  end 
end



