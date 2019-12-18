
Rails.application.routes.draw do
  resources :cartitems
  # resources :usercarts
  resources :users do
    resources :usercarts do
      resources :cartitems
    end
  end
  resources :products
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end


# Rails.application.routes.draw do
#   resources :cartitems
#   resources :usercarts
#   resources :users 
#   resources :products
#   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
# end
