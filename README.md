# ThinkLinkAssesment
## Bitcoin price tracker:
.env file contain:
<br/>
mailinformation & database information
<br/>
FROM = (Organization email id)
   <br/>
HOST = (name of the host)
   <br/>
USER=  (user id)
   <br/>
PASSWORD= (password)

## How To start in local inviroment:
1. clone the repogetory in your local enviroment
2. provide all the credential in .env file
3. run: npm install on therminal
4. run: npm run dev
5. post the request from postman or thenderclient etc..
6. url endpoint will be:  api/prices/btc?date=<date>&page=<pageno>&limit=<perpage>
7. Post body will have email : <email of the user>, max : <max limit of BTC value in USD>, min : <minimum limit of BTC value in usd>
   Example Body:
   {
      email:example@gmail.com
      max:20845
      min:18000
    }

## Can also run through docker:

## Tech stack used:
1. Nodejs v14.17.0
2. Expressjs
3. Nodemailer 
4. dotenv
5. mongoose
6. handler 
