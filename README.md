# e-xpressilize
A UCLAx Object-Relational Mapping (ORM) Challenge: E-commerce Back End using Express.js API and Sequelize
  
  "author": "Nikita \"Nik\" Sharpio",
  
  "license": "MIT",
  
  "version": "1.0.3",
  
  "description": "Object-Relational Mapping (ORM) Challenge: E-commerce Back End API Express.js, Sequelize, and MYSQL, Insomnia",
  
  "main": "server.js",
  
  "scripts": {
                "start": "node server.js",
                "seed": "node seeds/index.js"
              },
  
  "repository": {
                "type": "git",
                "url": "git+https://github.com/Niksharpkings/e-xpressilize.git"
                },
  
  "keywords": [
               "Object-Relational",
               "Mapping",
               "(ORM)",
               "Challenge:",
               "E-commerce",
               "Back",
               "End",
               "API",
               "Express.js",
               "Sequelize",
               "MYSQL",
               "mysql2",
               "dotenv",
               "Insomnia"
               ![Thunder Client(VScode Extension)]:(https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
               ],
  
  "dependencies": {
                "express": "^4.17.1",
                "sequelize": "^5.0.3",
                "dotenv": "^8.2.0",
                "insomnia": "^5.3.0"
                },
  
  "devDependencies": {
                  "nodemon": "2.0.19"
                  },
}

# Run The APP

~~~~~~~~~~~~~
// First We Need to Create the SQL Database and the Tables
- Step 1: enter in console terminal)
= $ <code> MySQL -u root -p <code>

- Step 2: enter your password.)
= Password: <code> <your password> <code>

- Step 3: enter in MySQL console terminal) * this to see all the available and active databases on system)
= $ <code> SHOW DATABASES; <code>

- Step 3: Enter in to the MySQL console terminal) 
* you can use any name as your database as long as it matches the .env file Database name. make sure to have the ";" at the end of the command *
= MySQL> <code> CREATE DATABASE expressilize_db; <code>

- Step 4: Enter in to the MySQL console terminal)
= MySQL> <code> exit; <code>

// Second We Will install the dependencies 

- Step 1: enter in console terminal) 
** this will install all the dependencies in the package.json file. make sure your in the root directory of the project)
= $ <code> npm install <code>

- Step 2: enter in console terminal) go to your .env and change DROP_IT: 'true'
= $ <code> npm run start <code>
 
  // Third We Will seed the database with some data
= $ <code> node seeds/index.js <code>

  // Fourth We Will run the server, but before you do make sure to change  DROP_IT: 'false' in the .env file.
= $ <code> npm run start <code>

git add -A
git commit -m "connect to jawsdb"
git push heroku main