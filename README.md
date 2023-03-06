# Break-Sweat

[![License: MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
  
## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Testing](#testing)
* [Questions](#questions)
* [Licensing](#licensing)

## Description

Break-Sweat brought to you by team GitSwole.

Break Sweat is a fitness web application that empowers users to achieve their workout goals. With access to a comprehensive database of exercises and workouts, personalized recommendations, and progress tracking features, Break Sweat provides a tailored fitness experience for users of all levels.

Visit the Heroku URL and click Login or Get Started. From the login page either login to you existing account or register a new account. Once logged-in/registered you will land on your profile page. From here you can view recent activities or navigate to your other personalized sections. Favorites section features a search menu, your favorited exercises and some suggested exercises. The Analytics section will display graphs to help you visualize your exercise results. And finally the Calendar section enables you to schedule workouts to plan out your fitness journey.

Deployed Project: https://intense-everglades-85455.herokuapp.com/

<br>
  <div>  
      <img src="./assets/break-sweat-landingpage.png" target="_blank" alt="" style="max-width: 768px; display: block;" />  
  </div>
<br>

## Installation

To run Break-Sweat locally you'll need to first install Node and then install the following modules:

- dotenv    v8.2.0
- express   v4.17.1
- mysql2    v2.1.0
- sequelize v5.21.7
- bcrypt    v5.0.0
- chart.j:  v4.2.1
- express-handlebars v5.2.0"
- nodemon (recommended)

## Usage

Create the database:
- Navigate to the project's root folder, open a terminal, and log into mysql: **mysql -u root -p**
- Then create the database using the db/schema.sql: **source db/schema.sql**

Seed and start the database:
- From a terminal run the command **npm run seed**
- Now start the server: **nodemon .**

## Contribution

Follow the "fork-and-pull" Git workflow.

  1. **Fork** the repo on GitHub
  2. **Clone** the project to your own machine
  3. **Commit** changes to your own branch
  4. **Push** your work back up to your fork
  5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Testing
  
N/A

## Licensing

Code and Docs released under [MIT License](https://choosealicense.com/licenses/mit/).
