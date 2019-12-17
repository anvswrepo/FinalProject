# ## cartitems - add usercart_id, product_id
# rails g migration AddForeignKeyToCartitems

class AddForeignKeyToCartitems < ActiveRecord::Migration[6.0]
  def change
add_column :cartitems, :usercart_id, :integer
add_column :cartitems,  :product_id, :integer
  end
end
