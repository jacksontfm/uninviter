# uninviter

Welcome to Uninviter! This is a guilt-free system to "uninvite" guests to your party by sending their invitation emails directly to their spam folder.

Uninviter is currently deployed on Render.
The frontend can be found here: https://inviter-event-planning.onrender.com
The backend can be found here: https://uninviter-backend.onrender.com

# setup

All of the dependencies are listed in the package.json files, so all you need to do is run "npm install" in both the client and server folders.

# database

For the backend, you will also need to create and populate the database. First, open your instance of PostgreSQL and create a database. Be sure to set the database name in your .env file, see .env section for details. After you do this, run these two commands: "npm run migrate" and "npm run seed". These commands will create and populate the tables in the database.

# email

This app requires you to have an active Mailersend email account. Follow these instructions to set up your Mailersend account: https://www.mailersend.com/blog/send-email-nodejs. You will need to create a new SMTP user and credentials, and these will need to be set in your .env file. See the .env section for detail. 

# .env

Both the frontend and backend use .env files to manage environment variables. You will need to create these yourself as they are not included in this repository.

The server .env will need to include the following: "PORT", "DB_NAME" (name of PostgreSQL database), "NODE_ENV" ("development" for testing, "production" for production), "EMAIL" (your Mailersend SMTP user email address), "EMAIL_PASSWORD" (your Mailersend SMTP user password). If you are deploying this project, then you will need to add a "DB_URL" variable, which will be the internal URL to your deployed database.

The client .env will only need to include "VITE_API_URL", which will be the url of your locally-run backend. If deploying, this will instead be the URL of the deployed backend.

# running the frontend/backend

To run the backend, cd into server and run the following: "npm run start" or "npm run express" for testing with nodemon.

To run the frontend, cd into client and run: "npm run dev".

# resources

This app relies on Nodemailer for sending of emails. https://www.nodemailer.com/

Emails are sent by Mailersend. https://www.mailersend.com/blog/send-email-nodejs

All styling is done via Tailwind. https://tailwindcss.com/

# future plans

There are routes written in the backend for modifying, adding, and deleting templates. These routes are fully functional on the backend and would only need to be implemented on the frontend.

In its current state, this app is effectively useless as users are not able to provide any information in the email aside from selecting a template. For proper event planning, users should also be able to enter a time/date for the event, as well as a location. This information should all be included in the email, which would require refactoring of both the client and server. The email invitations should also include contact information of the user so that guests can contact the user to RSVP. For example, the user's email is stored in the frontend of the app already, and it would be relatively simple to send it to the backend to include in the body of the email along with a message to contact them to RSVP.

Both users and guests are stored in a database on the backend. Users are matched upon login. If a user is not matched to an existing user in the table, then a new user will be created for them. Guests are linked to specific user records. Originally, the intention was that repeat users would be able to see the guests that they previously invited/uninvited upon logging back into the site, but this has not been implemented. There is some unfinished code written in /client/src/App.tsx in service of this.

There is also a backend route written for deleting a user. If a user would like to start from scratch, this route would delete them from the users table and also delete all of their stored guests. Similarly to the template routes, this route is fully functional in the backend and only needs to be implemented on the frontend.

Currently, guests cannot be removed from the invite and uninvite columns on the frontend. Functionality could be added to move a guest from one column to the other, or to remove a guest entirely.

There is no validation on adding guest emails, so non-email strings can be entered. This will cause an error if attempting to send an email. Validation should be added to this field.

Sending the emails takes a moment. It would be great to implement a loading screen or message that would appear while waiting for the emails to send.
