## Imp-links

- **[Deployment URL](https://polar-escarpment-85483.herokuapp.com/api/v1/docs/)**
- **[Database Design](https://dbdiagram.io/d/6058d505ecb54e10c33caefb)**

## Assumptions
- I have assumed that there are auth service or layer and these APIs behind these layers.
- There are two customer accounts and one offer inserted in database for testing purposes.

**Customers**
```js
[{
        "_id":"6053bb122571e53c32f34e4f",
        "name":"Ahmed Mahmoud",
        "email":"ahmed.m.web.dev@gmail.com",
        "password":"will-be-hased-password-using-bcrypt"
},
{
        "_id":"6053bb122571e53c72f45e9f",
        "name":"Mohamed Diaa",
        "email":"a.abdelfatah@gmail.com",
        "password":"will-be-hased-password-using-bcrypt"
       
}]
```
**Offer**
```js
{
        "_id":"6053bb132571e53c32f34e62",
        "title":"20% discount for new users",
        "description":"This offer for the new users who are using our application",
        "termsOfUse":"New accounts, based on your location you will get the offer if you are open app from out-scope area you will not get this offer",
        "discount":20
}
```
**Note** All times saved in DB in MS for consistency.

## Development
You can run the project in development environment by pulling the project and run the following commands.

- `npm i`   **inside project directory to install packages**
- `npm start` **to run the project**   

## Testing
- `npm run test:watch` **inside project directory to run test cases**  
## Deployment
I have already scaled this service into two services with load balancer because this offer in white friday so many requests and traffic may delay this service so to guarantee high availability and increase performance this service scaled up using vertical scalling. on service running on port **5000** and the second one running on **5001**

- `cd deployment`
- `docker-compose up -d`
- you can visit this url `http://localhost:8080/api/v1/docs`

## Finally 
we can also manage traffic for redeem API by using rate-limit to make temporary block for any useless traffic (brute-force) `Invalid traffic concerns`
