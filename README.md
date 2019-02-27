# Democratreats
Bringing Ancient Greek politics to life.

## DEVELOPER'S NOTE: Heroku deployed version in progress!

## What is Democratreats?

Democratreats is a polling web app designed to help people make decisions, whether it's a global change or a simple snack suggestion. This application allows permissioned admins to create polls that user accounts can vote on. Like a ballot box, the votes are completely private and anonymous, and each user can only cast one vote in each poll. 

## Tech

```
Node.js,
Express,
Handlebars.js,
Passport.js,
Moment.js,
Sequelize,
API routes

```
 
## Flow

THE USER - 
*creates an account*

*suggests an item*

*joins a poll*

*votes on items*

*sees the final result*

THE ADMIN - 
*creates an account*

*reviews employee suggestions*

*creates a poll with certain parameters*

*reviews poll answers*

*finalizes and publishes results*

## How

There are be two kinds of accounts that can be created with different privileges: admin accounts, and employee accounts. Admins have create and read functionality regarding polls. Users can vote in open polls and view the final result. Users can also create requests to suggest certain items they want in the office. Once a poll is closed, everyone is be able to see the winning result of the poll, yet only admins may see the current vote totals. The polls are open for voting until a set date that is determined by the admin when they create the poll. Users can see when the poll closes so they know how long they have to submit a vote. Built-in user authentication enables new accounts to be created and signed into. A database with several tables handles all the poll data, and voting records.

## Admin Account View

![Admin View](snap/admin.png)

## User Account View

![User View](snap/user.png)

## Display Vote Results

![Vote Results](snap/vote.png)



## Why

Democratreats makes an easy-to-use space for community input to build a healthy, active culture and make decisions with transperancy and privacy. We the creators want to promote the democratic process while giving options to communicate with peers and leadership.


## Future Goals

Heroku deployment
Convert to MongoDB
Have a set time expiration for the polls
Include GoogleOAuth


## Contributors

Wiley Buchanan,
Jordan Larios,
Andrew Smyth,
Ritesh 
