class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  # user and carts
  # def show
  #   user_carts = @user.usercarts
  #   render json: { user: @user, carts: user_carts } 
  # end  

  # user and cart and cart items
  # def show
  #   user_carts = @user.usercarts
  #   user_cartsid = @user.usercarts.first 
  #   user_items = user_cartsid.cartitems    
  #   render json: { user: @user, carts: user_carts, items:  user_items } 
  # end

  
  # user and cart and cart items and product name -- V2
  # def show
  #   user_carts = @user.usercarts
  #   user_cartsid = @user.usercarts.first 
    
  #   user_items = user_cartsid.cartitems
    
  #   productslist2 = []
  #   user_items.each { |id| 
  #   puts " id #{id}"
  # puts id.product_id
  #  prod_id =  id.product_id
  # puts Product.find(prod_id)
  # puts Product.find(prod_id).name
  # puts Product.find(prod_id).category
  #   singleprod = { item: id,  name:  Product.find(prod_id).name, category:  Product.find(prod_id).category,
  # price:  Product.find(prod_id).price, quantity:  Product.find(prod_id).quantity_instock
  # }
  # productslist2.push(singleprod)
  # }

  # puts productslist2
  #   render json: { user: @user, carts: user_carts, items:  user_items, products: productslist2  } 
  # end



  # user and cart and cart items and product name -- V3
    def show
      user_carts = @user.usercarts
      user_cartsid = @user.usercarts.first 
      
      user_items = user_cartsid.cartitems

      productslist2 = []
    
      user_items.each { |id| 
      puts " id #{id}"
    puts id.product_id
     prod_id =  id.product_id
    puts Product.find(prod_id)
    puts Product.find(prod_id).name
    puts Product.find(prod_id).category
      
    singleprod = { id: id.id, user_quantity: id.quantity, product_id: id.product_id,  name:  Product.find(prod_id).name, category:  Product.find(prod_id).category,
    price:  Product.find(prod_id).price, quantity:  Product.find(prod_id).quantity_instock
    }

    # singleprod = { item: id,  name:  Product.find(prod_id).name, category:  Product.find(prod_id).category,
    # price:  Product.find(prod_id).price, quantity:  Product.find(prod_id).quantity_instock
    # }
    productslist2.push(singleprod)
    }



      user_details = {
        "id": @user.id,
        "username": @user.username,
        "email": @user.email,
        "cart_id": user_cartsid.id,
       "last_accessed_date": user_cartsid.last_accessed_date,
       "cartitems": productslist2
      }


  
    puts productslist2

    # render json: { user: @user, carts: user_carts, items:  user_items, products: productslist2  } 
      render json: { user: user_details  } 
    end
  


    # user_item_products = user_cartsid.cartitems.products
      # user_itemsid = user_cartsid.cartitems.first
    # user_product = user_cartsid.cartitems


  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
