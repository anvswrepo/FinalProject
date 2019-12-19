class User < ApplicationRecord
    has_many :usercarts
end

def self.search(search)
    # Title is for the above case, the OP incorrectly had 'name'
    where("username EQUALS ", "%#{search}%")
  end