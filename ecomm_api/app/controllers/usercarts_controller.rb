class UsercartsController < ApplicationController
  before_action :set_usercart, only: [:show, :update, :destroy]

  # GET /usercarts
  def index
    @usercarts = Usercart.all

    render json: @usercarts
  end

  # GET /usercarts/1
  def show
    render json: @usercart
  end

  # POST /usercarts
  def create
    @usercart = Usercart.new(usercart_params)
    @usercart.user_id = params[:user_id]
    puts @usercart.user_id 

    if @usercart.save
      # render json: @usercart, status: :created, location: @usercart
      render json: @usercart, status: :created 
    else
      render json: @usercart.errors, status: :unprocessable_entity
    end
  end


# POST /temperatures
# def create
#   @temperature = Temperature.new(temperature_params)
#   @temperature.location_id = params[:location_id]

#   if @temperature.save
#     render json: @temperature, status: :created 
#   else
#     render json: @temperature.errors, status: :unprocessable_entity
#   end
# end




  # PATCH/PUT /usercarts/1
  def update
    if @usercart.update(usercart_params)
      render json: @usercart
    else
      render json: @usercart.errors, status: :unprocessable_entity
    end
  end

  # DELETE /usercarts/1
  def destroy
    @usercart.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usercart
      @usercart = Usercart.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def usercart_params
      params.require(:usercart).permit(:last_accessed_date)
    end
end
