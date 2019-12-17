# ## usercart  - add user_id 
# rails g migration AddForeignKeyToUsercart 



class AddForeignKeyToUsercart < ActiveRecord::Migration[6.0]
  def change
    add_column :usercarts, :user_id, :integer

  end
end
