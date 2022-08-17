# E-xpressilize
## description:
A UCLAx Object-Relational Mapping (ORM) Challenge: E-commerce Back End API

## Author:
- "Nikita "Nik" Sharpio"
- "UCLAx starter Code"

## license:
- MIT

## version:
- 1.0.30
  
## Main: 
### Edit only these files
- EDIT-ME-FIRST.env - for sql set-up !!! 🚩Delete the "EDIT-ME-FIRST" wording in the .env file name so it will look like ".env" nothing in front before using this app
- server.js - toggle the sync force if needed

## Prerequisite
- SQL APPLICATION SERVER (example: mysql

## How to use
~~~~~~~~~~~
- 1) Have a SQL database application Example: 'mysql'|'sqlite'|'postgres'|'mariadb'|'mssql' | ect...
- 2) Node.js
- 3) Command Terminal example bash, zsh, cmd, ect. (note not all will work)
- 4) A REST CLIENT ( Insomnia, thunderClient, ect... )
~~~~~~~~~~~

## Command to run.. start from root folder where the sever.js and package.json is
~~~~~~~~~~~
package.json
  "scripts": {
                "start": "node server.js",
                "seed": "node seed/index.js"
              }
~~~~~~~~~~~

## repository: 
- https://github.com/Niksharpkings/e-xpressilize.git

## Deployment site:
### Heroku, using jawsdb addon
~~~~~~~~~~~
https://polar-ravine-89380.herokuapp.com/
https://polar-ravine-89380.herokuapp.com/api/categories
https://polar-ravine-89380.herokuapp.com/api/products
https://polar-ravine-89380.herokuapp.com/api/tags
~~~~~~~~~~~
 
## Dependencies:
- express: "^4.17.1"
- sequelize: "^5.0.3"
- mysql2: "^2.3.3"
- dotenv: "^8.2.0"

## devDependencies:
- nodemon: "2.0.19"

## programs or extensions used:
- ![VScode](https://code.visualstudio.com/)
- ![Insomnia](https://insomnia.rest/)
- ![mySQL](https://www.mysql.com/)
- ![Thunder Client - (VScode Extension)](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

# Run The APP

## First We Need to Create the SQL Database and the Tables
## Im going to use Bash as my console and mysql as my database

- Step 1: enter in console terminal
~~~~~~~~~~~~~
$ mysql -u root -p
~~~~~~~~~~~~~

- Step 2: enter your password.
~~~~~~~~~~~~~
> Password: <your password>
~~~~~~~~~~~~~

- Step 3: enter in MySQL console terminal  this to see all the available and active databases on system
~~~~~~~~~~~~~
mysql> SHOW DATABASES;
~~~~~~~~~~~~~

- Step 3: Enter in to the MySQL console terminal 
* you can use any name as your database as long as it matches the .env file Database name. make sure to have the ";" at the end of the command *
~~~~~~~~~~~~~
 mysql> CREATE DATABASE expressilize_db;
~~~~~~~~~~~~~

- Step 4: Enter in to the MySQL console terminal
~~~~~~~~~~~~~
mysql> exit;
~~~~~~~~~~~~~

## Second We Will install the dependencies 

- Step 1: enter in console terminal
** this will install all the dependencies in the package.json file. make sure your in the root directory of the project)
~~~~~~~~~~~~~
$ npm install
~~~~~~~~~~~~~

- Step 2: enter in console terminal
~~~~~~~~~~~~~
$ npm run start
~~~~~~~~~~~~~

## if you want to have seeded data in the database continue to the next step, otherwise enjoy.

- Step 3: enter in console terminal
~~~~~~~~~~~~~
 ctrl + C to exit the server
~~~~~~~~~~~~~
 
- Step 4: We Will seed the database with some data
~~~~~~~~~~~~~
$ npm run seed
~~~~~~~~~~~~~

- Step 5: We Will run the server again, but now it will be with seeded data in the database
~~~~~~~~~~~~~
$ npm run start

#DEMO
