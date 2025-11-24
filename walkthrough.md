# Refactoring Walkthrough

I have successfully refactored your personal website to be more reusable and ready for future Firebase integration.

## Changes Overview

### 1. Data Extraction & Service Layer
- **Extracted Data**: All hardcoded data (skills, experience, blogs, etc.) has been moved to `src/data/index.js`.
- **Service Layer**: Created `src/services/dataService.js` to handle data fetching. currently, it serves the local data, but it is designed to be easily swapped with Firebase calls in the future.

### 2. Reusable Components
- **Layout Component**: Updated `src/components/Layout.jsx` to wrap all pages. It now handles the `Navbar` and the main container structure, reducing code duplication in each page.
- **FadeIn Component**: Created `src/components/FadeIn.jsx` to standardize the fade-in animation used across the site.
- **Navbar**: Updated `src/components/Navbar.jsx` to accept navigation links as props, making it dynamic.
- **Profile Image**: Updated `src/pages/Home.jsx` to display the user's profile image, which is now managed in `src/data/index.js`.

### 3. Page Refactoring
- **App.jsx**: Simplified routing by using the `Layout` component as a parent route.
- **Pages**: Refactored `Home`, `Career`, `Contact`, `Blogs`, and `LandingPage` to:
    - Fetch data using `dataService`.
    - Use the `FadeIn` component for animations.
    - Remove redundant layout code.

## Verification

I have verified that the code structure is correct and follows the plan.
Since the `npm install` command was cancelled, please run the following commands to verify the build locally:

```bash
npm install
npm run dev
```

## Next Steps (Firebase Integration)

To switch to Firebase in the future:
1.  Initialize Firebase in your project.
2.  Update `src/services/dataService.js` to fetch data from your Firebase Firestore instead of returning the local data.
3.  The rest of the application will automatically use the new data source without any changes to the UI components!
