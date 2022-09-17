# ThinkLinkAssesment
## Bitcoin price tracker:
Addd.env file contain:

mailinformation & database information

FROM = (Organization email id)
   
HOST = (name of the host)
   
USER=  (user id)
  
PASSWORD= (password)
   
max= (maximum limit)
   
min= (minimum limit)
   
email= (email)

## How To start in local inviroment:
1. clone the repogetory in your local enviroment
2. provide all the credential in .env file
3. run: npm install on therminal
4. run: npm run dev
5. Make a get request from postman or thenderclient etc..
6. url endpoint will be:  api/prices/btc?date=<date>&page=<pageno>&limit=<perpage>

## Can also run through docker:

## Tech stack used:
1. Nodejs v14.17.0
2. Expressjs
3. Nodemailer 
4. dotenv
5. mongoose
6. handler 
