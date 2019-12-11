# FinalProject
GAFinal

SHOPPING CART

User stories

Search for items from a product catalog

Add items to Shopping Cart

Checkout Shopping Cart

Return to Shopping and Continue to Add items

Remove Items from Shopping Cart

Optional: Save shopping cart (requires login)




Models


Products – ProductID, Name, Description, Category, Keywords, Price, ImageURL 
(This will be pre-populated) (Will have Show/Index Routes)

CartItems  – ItemID, ProductID, Price, Qty, (CartID) (Created, Updated, Destroyed)

UserCart – CartID, UserID, LastAccessedDate (Create, Update, Destroy)

User – UserID, Email, Password (Create, Update)


Backend : Ruby

Frontend : React, Bootstrap

Likely add-ons post project: 
Payment capability



