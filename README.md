# Infleux Test Front

## Description

This is a Front end application crated for Infleux's test, according to [these instructions](https://docs.google.com/document/d/1U5sSpNvm6nVlphHklTCs5rM2GTg2MAZ5dA1JgaxNM-U/edit#).

This was developed using ReactJS, MaterialUI, JSS and deployed at Heroku.

When filling the form correctly (without any errors in the fields), a new campaign will be submitted to this endpoit of the [back-end application](https://github.com/maryplank/infleux-api):

`POST https://infleux-api.herokuapp.com/api/v1/campaigns`

```json

  {
    "name": "Vivara",
    "description": "Campanha para nova linha de berlocs da Disney",
    "conversionType": "CPC",
    "country": "brazil",
    "bid": 1.65
  }
```
All fields are mandatory, except for description. So if you try to **submit** blank fields, you will see some errors on the fields.

You will see a green toaster on the screen if the request was successfull, and a red one if something went wrong (you might experience an error at the first try, but this is because the back-end application is deployed at heroku and it gets lazy somtimes. Just try again!)

To improve usability and standardization in the database, I used [this API](https://documenter.getpostman.com/view/1134062/T1LJjU52?version=latest) to get all countries list, and formatted them before sending so all countries will be lowercased and kebab-case, so you can find the best campaign for each country easier.

See the[ back-end application documentation](https://github.com/maryplank/infleux-api) for the `GET` routes you can consult to check your new camapaign :)

## Run locally

Clone this repo: 

`https://github.com/maryplank/infleux-front.git`


Inside the project's directory, install the dependecies:

`npm install`


To run locally in development mode:

`npm start`
