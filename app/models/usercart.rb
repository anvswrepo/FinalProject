class Usercart < ApplicationRecord
    has_many :cartitems
    belongs_to :user
end
