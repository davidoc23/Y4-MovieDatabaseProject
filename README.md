[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/zv-2SUYh)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17236708)
# Project Name Movie-App

Title: Movie-App
Name: David O Connor
Student ID: G00400530

**Application Function**
The Movie-App allows users to search for movies, view detailed information about a selected movie, and get personalized movie recommendations using AI-powered APIs. Users can interact with the app to explore trending movies, view trailers, and add movies to their favorites list.

Key Features:
Search Functionality: Users can search for movies by title.

Movie Details: View detailed information about a movie, including title, synopsis, cast, and reviews.

Recommendations: AI-driven recommendations for movies based on user preferences.

Favorites Management: Add and manage a list of favorite movies.

User Authentication: Users can sign up, log in, and reset passwords. Includes session handling for user login.

Logout: Users can log out of the app, which clears the form fields and redirects to the login page.

Password Reset: Users can reset their password and receive a confirmation message on success.


![image](https://github.com/user-attachments/assets/3ed89d03-d471-4bce-a85d-4cfe692f699d)

## Running the Application

```MARKDOWN
List the instructions step by step
    1. Install Angular CLI - npm install -g @angular/cli
    2. Clone the repo
        git clone https://github.com/DanielCreggOrganization/acpad-project-2024-davidoc23.git
        cd Movie-App
    3. Run the App : ionic serve
    ** Use oconnordavid18@gmail.com and Popcorn1 as the login information**
```
**Prerequisite Software:**

Node.js and npm (for Angular and Ionic)
Ionic CLI and Angular CLI
Firebase (if used for backend)


## Minimum Project Requirments

Confirm and demonstrate how you have met all minimum project requirments:

* The project, including code and documentaion, will be fully contained in the provied Git repo.
* The project **MUST** contain a working Ionic Angular app which matches the app you chose.
* The Ionic app must include the use of the Angular Router, Connection to a Backend service such as Firebase or Supabase, Use of a Capacitor native plugin.
* The app must not resemble in any way an app you have previously developed for another module or are currently developing for any project. 
* The code MUST compile. 30% grade reduction if code does not compile when I issue the ionic serve command. 
* The application code must be formatted in a consistent and standard way.
* The code must contain comments. One comment per class, method and variable at minimum.
* There must be two commits per week minimum (Note: Should be many commits per day coding).
* The documentation and commentary must be free of a grammar and speling mistakes.

## Project Requirments above and beyond

AI-driven Movie Recommendations: The app includes an AI-powered recommendation engine to suggest movies based on the user’s preferences.
Password Reset Functionality: Users can reset their passwords with a confirmation email.
Logout Functionality: Implemented a logout feature that clears user session and form data (email, password).
Favorites Management: Users can save their favorite movies, and the list is saved locally or in Firebase.
Responsive Design: The app is designed to be fully responsive for mobile and desktop users.


## Application Architecture
The application consists of the following main pages:

**Movie Details Page**
Purpose: Displays detailed information about a selected movie, including title, synopsis, cast, reviews, and user ratings.

Methods:
getMovieDetails(movieId: string): Fetches and displays movie details.
addToFavorites(movieId: string): Allows users to add the movie to their favorites list.

**Favorites Page**
Purpose: Displays the list of movies that the user has added to their favorites.
Methods:
getFavorites(): Retrieves the list of favorite movies from local storage or a backend service.

**Search Page**
Purpose: Provides a search bar where users can search for movies by title.

Methods:
searchMovies(query: string): Searches for movies based on the query entered by the user.

**User Authentication (Login/Signup/Logout)**
Purpose: Manage user authentication, including signup, login, password reset, and logout.
Methods:
signup(email: string, password: string): Signs up a new user.
login(email: string, password: string): Logs in a user.
resetPassword(email: string): Sends a password reset email.
logout(): Logs out the user, clears the form fields, and redirects to the login page.

**Data Storage**
Firebase: Used to store and retrieve user data (authentication, favorites).
Local Storage or Capacitor Storage: Used to store the list of favorite movies.

![image](https://github.com/user-attachments/assets/a5324c6a-2014-4d71-be6c-33f5852df27b)


## Roadblocks and Unfinished Functionality

Discuss the issues you faced with creating your application. Provide possible solutions to these issues. What would you have done differently if you had to do this again? What did you not get finished?


Challenges Faced
    API Integration: Encountered a 400 error with the Google Gemini API due to invalid query parameters.
    Solution: Updated the API request payload to align with Gemini’s documentation. (still cannot get the api to work)
    Firebase Integration: Faced issues while setting up Firebase for user authentication.
    Solution: Adjusted Firebase configuration and ensured all necessary API keys were correctly implemented.

Unfinished Functionality
Social Sharing: Planned feature to share movie details via social media remains incomplete.
Push Notifications: The app currently lacks push notification functionality for recommendations.
Offline Mode: Allowing the user to use the app when theyre not online to see watchlist info etc.
## Resources

Provide links to resources used:

* [YouTube](https://www.youtube.com/watch?v=Y0vH5Cm3HAk) - YouTube Tutorial I found helpful
