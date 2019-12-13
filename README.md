# MySQL, Express, React, Node application for SVDP

> See the Developer Guide for the guide on project structure, deploying to Google App Engine, and database access.

## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently (this is to start up the app and run it locally)
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:8080 and client on http://localhost:3000
```

## What if I want to...

## Know how to deploy my app?
```
Refer to the section in the comprehensive developer guide on "Deploying to GCP"
Specifically, the "Deploying to Google App Engine" section (if Google Cloud SDK is already installed)
````

## Know how to edit the front end code?
```
Look at the section titled "Developer Guide for Front End" and the "Project Structure" section
This will inform what you can change and where. In the project code itself, it's in the client folder
Nicole put comments on the different components within the "components" folder which should be where you edit.
```

## Know how to edit the back end?
```
If you want to edit the database, refer to the "Developer Guide for our Database" and the SVDP_SQL_code.docx file. 
When you know how to access the database, you can make your own SQL statements with the samples or use the actual SQL script provided.
```

## What is npm and what does it mean in the context of this project?
```
In the "Node" section of our developer guide, it gives a bit of information with regards to Node and using Node Package Manager (npm).
We use "npm" and its various commands to execute scripts that will build and run our project locally.
The guide will list out some commands with "npm" along with the beginning of this README with the Quick Start section.
```

