# Shopping Cart

Link to the project: https://konrad-szejgiec-fastshop.herokuapp.com/

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Running the application](#running-the-application)
- [Notes](#notes)

## General info

It's a simple shopping cart with add/update/remove options on client's request. You can only add items to cart from example stock list (hosted in a MongoDB Atlas) which appears while you fill in the form (it works like a simple search engine - items matching the entered data are displayed under the form). Then you can proceed to checkout (by clicking PROCEED TO CHECKOUT button), where you can buy all items at once or go (by clicking pencil icon) to the item description (they are just different parts of lorem ipsum) and buy each item separately. Max size of a cart is 10 items. The app doesn’t allow to duplicate items - each position on the list is unique - duplicates will not be saved. Price field is auto filled. Requests are stored in MongoDB hosted in the cloud with MongoDB Atlas using basic REST API created with Node.js/Express. The client-side code is written in clear (vanilla) ES6 JS (no frameworks), server side uses Node.js and Express. HTML templates was created using PUG.

## Technologies

- JavaScript
- Node.js
- Express
- MongoDB
- PUG

## Running the application

https://konrad-szejgiec-fastshop.herokuapp.com/

## Notes

HTML skeleton was partially taken from Udemy course: "Modern JavaScript From The Beginning", made by Brad Traversy, and then modified to pug files.
