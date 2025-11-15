# Jack of all trades
# Problem:
- People sometimes struggle with having piled up things that they can't throw away because they have value, but they can't find someone/place they can sell/donate to.

# Solution:
- We created a website similar to e-commerce websites. however seeling products in not its purpose. In our website people can join to exchnage their items with others', or they can post items for free, no exhnages needed. Here the user can post an item and if someone is interested in taking it, they have to give back one in return.

# User Stories:
- As a user, I can join the website using google/facebook account.
- I can post about the items that I either want to offer for an echange, or want to donate.
- I can browse what others have posted.
- I can request a certain item.
- I can get requests for the items I posted.
- I can either accept or decline the requests I get.
- I can pick an item from the user who requested from me, in exchange.
- I can see my requests and favorites from my profile page.
- I can recieve request notifications.

# User Journey:
If you want to request something:
- When the user enters the website he will first see the landing page, that contains an introduction about the website.
- When he clicks on join us button, he will be moved into signup page, where he can signup with google, facebook or create his own account.
- Then he can request a cetrain item, or post a new item for donation or exchange.
- When he requests an item, the user who posted an item will be notified, and will be able to either accept or decline the request.
- If the user who got the notification is interested in the offer, he can visit the sender's profile and pick a certain item in exchange. Otherwise he can decline the request.
- If the reciever picks an item, the sender will be notified in return about the exchange, where he will also need to either accept or decline.
- The exchange will be marked as successful when both parties accept each other's requests. Otherwise, no one gets anything.

If you want to post something:
- The user can go to his profile, where he will find all the items he posted.
- He can delete or edit any of his posts . 
- He will find an 'add item' button,when clicked a popup will appear where he can add the details about the new item and post it.

## **Prototype**

[View Prototype](https://www.figma.com/file/fPQZSpIJOamNJ9FMTg59x0/PWA-eCommerce-Theme-(Community)?node-id=184%3A0)

------------------------
![dentoro](https://i.imgur.com/E8s1cPE.png)

## **Environment variables**
Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.
- create .env file
- add your Environment variables
```sh
DEV_DB_URL= # Your development PostgreSQL connect
TEST_DB_URL = # Your test PostgreSQL connect
DATABASE_URL= # Your production PostgreSQL connect
SECRET_TOKEN= # Your token Secret key
JACK_TRADES: #react localhost
```

## **Database Setup**

make sure you have installed PostgreSQL and pgcli 

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```
- Test DB:
- Do the same as before but make sure to change the names.

` Run the following command in the terminal  `npm run db:seed` `

## **Technologies**
- Nodejs
- Express
- Socket.io
- Sequalize
- React
- Postgres
- MaterialUI

## **Lead Mentor**

- [Muhammad Abdulhadi](https://github.com/Mu7ammadAbed)

## **Team Members**

- [Sara Dahman](https://github.com/SaraDahman)
- [Mohammed Balousha](https://github.com/MohammedOmar123)
- [Abdalhakim Abumusameh](https://github.com/hkmusameh01)