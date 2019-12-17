class CreateUsercarts < ActiveRecord::Migration[6.0]
  def change
    create_table :usercarts do |t|
      t.date :last_accessed_date

      t.timestamps
    end
  end
end
