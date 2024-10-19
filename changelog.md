# Changelog

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
