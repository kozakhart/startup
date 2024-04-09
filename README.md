# Startup Docs

### My Pitch for Wunderbundles
There is a market for people who want to be surprised by unique products. Everyone knows the feeling of getting a gift from a friend on a birthday. It feels very special to unexpectedly get a gift versus buying something for yourself. This website sells "wunderbundles" that surprise you with digital surprise gifts!

### Key Features
This website is broken up into a login page, home page, shopping page, about page, and account page. Visitors will be able to create an account, make orders, and view their information.

### Implemented Tech
This website will implement authorization, databases, and websockets in the following ways:
1) Visitors will use a login page which will require authorization
2) Customer info and orders will be recorded in database
3) A websocket will display real-time completed orders on the homepage

### Images
![Image 1](1.png)
![Image 2](2.png)
![Image 3](3.png)
![Image 4](4.png)
![Image 5](5.png)

### HTML Deliverable
1) Basic login page, routes to index.html
2) Home page with navigation to other pages and number of orders filled
3) Shopping page
4) About page with information about the site
5) Account page with personal info, orders, and logout button that redirects to login

### Javascript
1) Javascript alert upon not giving password
2) Username is saved on login to localstorage and displayed on pages
3) Account info can be changed and saved
4) Orders can be made and are displayed in several different places
5) Random orders from other people are made and added to total. This simulates live data being generated.
6) Orders are also separated by personal orders and total orders by all customers.

### Startup Service
1) Changed app to use Node.js/express
2) I have the static middleware
3) Added order endpoint get/post
4) Called order endpoint get/post
5) Added third party endpoint to display quotes on about page

### Login
1) Added auth to index
2) Added login functionality
3) Added register function
4) Added logout function
