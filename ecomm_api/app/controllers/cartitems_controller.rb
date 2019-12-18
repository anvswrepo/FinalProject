class CartitemsController < ApplicationController
  before_action :set_cartitem, only: [:show, :update, :destroy]

  # GET /cartitems
  def index
    @cartitems = Cartitem.all

    render json: @cartitems
  end

  # GET /cartitems/1
  def show
    render json: @cartitem
  end

  # POST /cartitems
  def create
    @cartitem = Cartitem.new(cartitem_params)
    @cartitem.product_id = params[:product_id]
    @cartitem.usercart_id = params[:usercart_id]

    if @cartitem.save
      render json: @cartitem, status: :created
    else
      render json: @cartitem.errors, status: :unprocessable_entity
    end
  end

# .....
# create_table "cartitems", force: :cascade do |t|
#   t.integer "quantity"
#   t.datetime "created_at", precision: 6, null: false
#   t.datetime "updated_at", precision: 6, null: false
#   t.integer "usercart_id"
#   t.integer "product_id"


# def create
#   @usercart = Usercart.new(usercart_params)
#   @usercart.user_id = params[:user_id]
#   puts @usercart.user_id 

#   if @usercart.save
#     # render json: @usercart, status: :created, location: @usercart
#     render json: @usercart, status: :created 
#   else
#     render json: @usercart.errors, status: :unprocessable_entity
#   end
# end

# ......



  # PATCH/PUT /cartitems/1
  def update
    if @cartitem.update(cartitem_params)
      render json: @cartitem
    else
      render json: @cartitem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cartitems/1
  def destroy
    @cartitem.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cartitem
      @cartitem = Cartitem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cartitem_params
      params.require(:cartitem).permit(:quantity, :product_id)
    end
end
