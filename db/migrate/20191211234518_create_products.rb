class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :category
      t.string :keyword
      t.decimal :price
      t.integer :quantity_instock

      t.timestamps
    end
  end
end
