# 📚📝🕮 TutorHunt - Client Side 🚀

---

### 🔗 Deployment Links:
 🎨 - **Frontend**: [https://tutor-hunt-b92c2.web.app](https://tutor-hunt-b92c2.web.app)

 ⚙️ - **Backend**: [https://b10-a11-tutor-hunt-server.vercel.app](https://b10-a11-tutor-hunt-server.vercel.app)

---

## ✨ Short description
The **TutorHunt** is an online tutor booking and language learning platform designed to connect students with professional tutors for a wide range of languages. This project facilitates easy scheduling, booking, and management of language tutorials while providing a user-friendly interface.

---

## 🎯 Purpose
TutorHunt aims to simplify the process of finding and booking language tutors online. It provides students with categorized language options, detailed tutor profiles, and easy scheduling features, ensuring an efficient and streamlined learning experience.

---

### 💡 Key Highlights:

- 🔐 **Authentication**:
  - Secure user login with JWT and cookie-based authentication.
  - Logout functionality to clear user sessions.
- 🧩 **Tutor Management**:
  - Add, update, and delete tutor profiles.
  - View tutor profiles by language categories.
  - Increment tutor reviews dynamically.
- 📂 **Language Categories**:
  - Retrieve and display available language categories.
  - Display tutor counts for each category.
- 🔖 **Bookings**:
  - Book tutors and view booking history for authenticated users.
  - Prevent unauthorized access to booking data using JWT verification.
- 📊 **Statistics**:
  - Show real time statistics to users.
  - Active users, reviews, total tutors shows dynamically.
- 💾 **Database Operations**:
  - CRUD operations for tutors, users, and bookings.
  - Aggregation queries for counting and calculating reviews.
- ⚓ **Responsive APIs**:
  - Dynamic APIs for filtering tutors by language or email.
  - Count endpoints for statistical data.

---

## ⚛️ React Fundamentals Used

This project demonstrates key React concepts, including:

- **Functional Components:** All components are implemented using React functional components for better readability and performance.
- **Hooks:**
  - `useState`: For managing local component states .
  - `useEffect`: To handle side effects like initializing third-party libraries .
  - `useContext`: For managing authentication data using a custom `AuthProvider`.
  - `useNavigate`: This hook is used to programmatically navigate to different routes in the app. It's especially useful for redirecting users after actions like logging in or logging out.
  - `useLocation`: Used to get the current URL, which can be helpful for conditional rendering, like displaying different navigation options based on the user's route.
  - `useLoaderData`: Used to access the data loaded by the route's loader function in React Router. It allows components to retrieve preloaded data for a route, improving efficiency and enabling seamless server-client data fetching.
  - `useParams`: Used to access dynamic route parameters in React Router, such as :id or :category. It helps in extracting values from the URL, making it useful for tasks like fetching specific data or rendering content based on the current route's parameters.

- **React Router:**
  - Nested and dynamic routing for smooth navigation.
  - **Private Routes**: Only authenticated users can access certain pages.
  - Custom error handling page for unavailable routes using Error404 page.
- **Component Lifecycle:** Proper management of component mounting, updating, and unmounting using `useEffect`.
- **State Management:** Local state management for features like user authentication and form handling.
- **Context API:** Used for managing global user authentication state across the app.
- **Link and NavLink:** Used for managing global user authentication state across the app.
 - `Link`: A component used for navigation in React Router. It prevents page reloads and enables smooth transitions between routes.
 - `NavLink`: A component that is similar to Link but provides additional functionality such as adding an active class when the link is selected. This is useful for navigation bars or menu items to highlight the active route.
- **Props and Children:** Used for managing global user authentication state across the app.
 - `Props`: Properties that are passed into components to dynamically render content or configure behavior.
 - `Children`: In React, children is a special prop used to pass elements between the opening and closing tags of a component. This allows for reusable and flexible components.

---

 ## 🌟 Features

### 🔐 **Authentication**
- Secure **Firebase Authentication**.
- Supports **email/password login** and **Google login/logout**.
- Private routes to protect sensitive pages.

### 🖌️ **UI & UX**
- **Responsive design** ensures compatibility across all devices.
- **DaisyUI** and **Tailwind CSS** for a clean, customizable UI.
- Dark mode for user convenience.
- **Swiper slider** for engaging carousels and showcases.
- Smooth animations with **Lottie React** and **React Awesome Reveal**.

### 🕒 **Developer-Friendly**
- React Hooks for state management.
- Integrated **React Helmet** for dynamic page titles and SEO.
- **React Tooltip** for better user interaction.

### 🔔 **Notifications & Alerts**
- Elegant alerts with **Sweet Alert**.
- Real-time feedback with **React Hot Toast**.

## ⚙️ Key Functionalities
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Animations**: Interactive user experience powered by animation libraries.
- **Searching & Filtering**: Advanced filters for find tutors based on categories.
- **CRUD Operations**: Manage products with full Create, Read, Update, Delete functionality.
- **Private Routes**: Restrict access to authenticated users.
- **jsonwebtoken (JWT)**: Secure token-based authentication.
- **cookie-parser**: Parse and manage cookies in the backend.
- **Axios and TansStack Query**: For securely fetching data from the backend.

---

## 🛠️ Technologies Used

### 🖼️ Frontend
- **React**: Component-based UI library.
- **DaisyUI & Tailwind CSS**: For styling and responsive design.
- **Lottie React**: For animation.
- **Swiper**: Carousel and slider implementation.
- **React Icons**: Predefined icons for aesthetic UI.
- **Animate CSS**: For enhanced UX animations.
- **React Awesome Reveal**: Beautiful entry animations.
- **React Framer Motion**: Beautiful and excellent animations.

### 🗃️ Backend
- 🌿 **Node.js**: JavaScript runtime for the backend.
- 🚏 **Express.js**: Framework for building RESTful APIs.
- 🍃 **MongoDB**: NoSQL database for data storage.
- 📋 **dotenv**: Environment variable management.
- ⏱️ **jsonwebtoken (JWT)**: Secure token-based authentication.
- 🔑 **cookie-parser**: Parse and manage cookies in the backend.

### 🔄 Authentication
- 🔥 **Firebase**: Authentication and deployment.

### 📦 Deployment
- 📡 **Firebase**: For client deployment.
---


## 🌀 Dependencies and Tools Used
- [react](https://www.npmjs.com/package/react): A JavaScript library for building user interfaces.
- [react-dom](https://www.npmjs.com/package/react-dom): Provides DOM-specific methods for React.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): Declarative routing for React applications.
- [daisyui](https://www.npmjs.com/package/daisyui): Tailwind CSS components for faster UI development.
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework.
- [animate.css](https://www.npmjs.com/package/animate.css): CSS animations for enhanced user experiences.
- [framer-motion](https://www.npmjs.com/package/framer-motion): A library for creating smooth animations.
- [react-awesome-reveal](https://www.npmjs.com/package/react-awesome-reveal): Animation library built on React and Framer Motion.
- [swiper](https://www.npmjs.com/package/swiper): Modern touch slider for beautiful carousels.
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): Powerful data-fetching library for React.
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for fetching data.
- [firebase](https://www.npmjs.com/package/firebase): Backend platform for authentication and data storage.
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast): Lightweight notifications for React.
- [sweetalert2](https://www.npmjs.com/package/sweetalert2): A library for creating customizable modals.
- [react-icons](https://www.npmjs.com/package/react-icons): Comprehensive icon set for React applications.
- [react-countup](https://www.npmjs.com/package/react-countup): React component for animated number counters.
- [lottie-react](https://www.npmjs.com/package/lottie-react): Lottie animations for React.
- [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee): Smooth scrolling marquee for React.
- [react-spinners](https://www.npmjs.com/package/react-spinners): Loading spinner components.
- [vite](https://www.npmjs.com/package/vite): Next-generation frontend tooling for fast builds and development.
- [eslint](https://www.npmjs.com/package/eslint): Linter for identifying and fixing code issues.
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react): Official React plugin for Vite.
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): Automatically adds vendor prefixes to CSS rules.
- [postcss](https://www.npmjs.com/package/postcss): A tool for transforming CSS with plugins.


---

## 📧 Contact With Me for More

Feel free to explore and contribute to this repository. Happy coding!😊

## 🤝 Thank You

