# Changelog

## [0.4.0] - 2024-12-13
### Added
- A customers order history can now be viewed in the order history page for the respective user. Along with seeing their past orders, they can quickly add those items back to the cart to reorder them! Last, when a customer places an order, they can see the status of their order.
- On the other side of the food sales operation, a staff page was created where the cashier can see incoming orders and decide to accept or deny them which will notify the customer on their side based on the decision. If the order is accepted, then it will move over to a queue of orders that need to be prepared to serve to the customer. Once the food is ready and served to the customer, the cashier can complete the order by clicking the complete button.

### Fixed
- Bug involving authentication 


## [0.3.0] - 2024-11-08
### Added
- `AuthService.js` to handle route protection and user authentication status checks.
- Added requireAuth as wrapper for protected routes. Ensuring only authenticated users can access.
- Added requireNoAuth as wrapper for authentication routes (e.g., login, signup), redirecting users to the home page if already logged in.
- route protection through implementing protected routes in App.j

### Changed
- Updated `Login.js` and `SignUp.js` components to redirect authenticated users to /home after a successful login or sign-up.
- Refactored `App.js` to use requireAuth and requireNoAuth from `AuthService.js` for handling protected and unprotected routes respectively.

### Fixed
- Added logic to handle users manually typing URLs for protected routes, ensuring they are redirected to the login page if not authenticated.
- Enhanced logout functionality in `Header.js` to redirect users to the login page on successful logout, improving the user experience.

  
## [0.2.0] - 2024-10-18
### Added
- Implemented login, signup, and order functionality with Parse database.
- Added `OrderServices.js` and `UserServices.js` to handle Parse queries outside of components.
- Integrated Back4App to manage user data, menu items, and order submissions.
- Display user greeting (`Welcome, user!`) in the header when logged in.
  
### Changed
- Refactored `Login.js`, `SignUp.js`, and `OrderPage.js` to use service functions.
- Separated inline CSS from components into separate CSS files.

### Fixed
- Corrected error with order submission (`orderDate is required`).


## [0.1.0] - Initial Release
### Added
- Basic project setup using Create React App.
- Configured Parse initialization with Back4App.
- Implemented routing between login, signup, home, and order pages.
- Added a basic menu in `OrderPage` with options to add/remove items from the cart.
