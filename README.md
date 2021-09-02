# Shopping Cart

Link to the project: https://konrad-szejgiec-fastshop.herokuapp.com/

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Running the application](#running-the-application)
- [Notes](#notes)

## General info

It's a simple shopping cart with add/update/remove options on client's request. You can add to cart items only from example stock list (hosted in a MongoDB Atlas) which is showed while you input data to form (it works like simple search engine - items matching the entered data are displayed under the form). You can next proceed to checkout (by clicking PROCEED TO CHECKOUT button), where you can buy all items at once or go (by clicking pencil icon) to the item description (they are just different parts of lorem ipsum) and buy each item separately. Max size of cart is 10 items. Cannot duplicate items - every position on the list is uniqe - duplicates will not be saving. Price field is auto filled. Requests are stored in a MongoDB hosted in the cloud with MongoDB Atlas using basic REST API created with Node.js/Express. The client-side code was written in clear (vanilla) ES6 JS (no frameworks), server side uses Node.js and Express. To create HTML templates was used PUG.

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
