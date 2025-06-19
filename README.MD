# Restaurant Finder Application

## Introduction
Welcome to the **Restaurant Finder Application**, a cutting-edge web application tailored to help users discover restaurants and meals with ease. Whether you're seeking delivery or pickup options, this app ensures a seamless experience with advanced search capabilities, dynamic filtering, and intuitive user interactions.

This project was crafted as part of a job application to demonstrate my expertise in frontend development, backend integration, and state management using contemporary technologies.

Visit the site [here](https://natnael-worku-a2sv-task-4oesj1moi.vercel.app/).

---

## Tech Stack
The application harnesses the following technologies:

- **Frontend**:
  - [React](https://reactjs.org/): A JavaScript library for crafting user interfaces.
  - [Next.js](https://nextjs.org/): A React framework for server-side rendering and static site generation.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for styling.

- **State Management**:
  - [Redux Toolkit](https://redux-toolkit.js.org/): A modern approach to managing state in React applications.

- **Backend Integration**:
  - [MockAPI](https://mockapi.io/): A mock API service utilized for testing and development.

- **Other Tools**:
  - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language for JavaScript.
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview): A data-fetching and caching tool integrated into Redux Toolkit.

---

## Features
### Core Features:
- **Restaurant Cards**:
  - Shows restaurant details such as name, price, rating, and status (e.g., "Open Now" or "Closed").

- **Search Functionality**:
  - Offers dynamic filtering of restaurants based on user input via the backend API.

- **Modals**:
  - Facilitates adding, editing, and deleting restaurant details with user-friendly modals.

- **Validation and Error Handling**:
  - Provides clear error messages for invalid inputs (e.g., missing fields or incorrect formats).

- **Empty States**:
  - Displays meaningful messages when no data is available (e.g., "No items available").

- **Footer**:
  - Contains navigation links and company information.

### Additional Features:
- **Responsive Design**:
  - Optimized for mobile, tablet, and desktop devices.

- **Dynamic Loading**:
  - Enables dynamic loading of more restaurants with a "Load More" button.

- **Semantic HTML**:
  - Ensures accessibility and SEO-friendly markup.

---

## Implementation Details
### Folder Structure
The project adheres to a clean and modular folder structure to facilitate scalability and maintainability:

- **components/**: Contains React components such as `FoodCard.tsx`, `HeroSection.tsx`, `FeaturedMeals.tsx`, and modals.
- **pages/**: Includes Next.js pages for routing.
- **store/**: Houses Redux store configuration and API slices.
- **styles/**: Encompasses global and component-specific CSS files.
- **utils/**: Contains utility functions for reuse across the application.

### Key Components
1. **FoodCard.tsx**:
   - Renders restaurant details like name, price, rating, and status.
   - Utilizes semantic HTML elements like `<article>` for accessibility.

2. **HeroSection.tsx**:
   - Features a search bar for dynamically filtering restaurants.
   - Incorporates tabs for "Delivery" and "Pickup" options.

3. **FeaturedMeals.tsx**:
   - Fetches and displays restaurant data from the backend.
   - Manages empty states and dynamic loading.

4. **Modals**:
   - **AddFoodModal.tsx**: Allows users to add new restaurants.
   - **EditFoodModal.tsx**: Enables editing of restaurant details.
   - **DeleteFoodModal.tsx**: Confirms the deletion of restaurants.

5. **Footer.tsx**:
   - Provides navigation links and company information.

---

## How to Set Up Locally
Follow these steps to set up the project on your local machine:

### Prerequisites
- Ensure you have Node.js (v16 or higher) installed.
- Use npm or yarn as your package manager.

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/restaurant-finder.git
   cd restaurant-finder
   ```
2. Install the project dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Testing
To ensure the application functions as expected, run the tests using:
```bash
npm run test
# or
yarn test
```

---

## Deployment
To deploy the application, follow these steps:

1. Build the application for production:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Deploy the build output to your preferred hosting service.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code adheres to the project's coding standards and includes appropriate tests.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

