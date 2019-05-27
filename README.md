# #Proud
### Project made for Vendre
This project is made as a school assignment and handed to us from Vendre AB in Stockholm. 

## Case
Vendre came to us and said they wanted a way to show appreciation to colleagues and to log our own accomplishments in a timeline style application that would integrate with slack. The design were to be simple anc clean. 

## Technologies
For this project we have used the following techstack:
* Vue.js
* Vuex
* Axios
* Firebase
* Foundation 6 (css library)
* Node.js backend (https://www.github.com/fabifors/vendre_proud_backend)

## Run the project
To run the project simply follow these steps:

1. `$ git clone https://github.com/b3rg3t/vendre_proud`
2. `$ cd vendre_proud`
3. Create your own `config.js` inside `/src` folder from your firebase setup.
4. `$ npm install`
5. `$ npm run serve`

If you want to make changes in the backend part you'll need to fork that repo and host it on heroku yourself. 
> Note: You will have to change some links in this project for it to work. 

## Contribute
There are some parts of the application that needs work. Some small changes like styles and such, (e.g. responsiveness) and other changes relating to structure of vuex and application logic. Here are the remaining backlog:

* Add function to mention another user in any proud message
* Add dark/light theme
* Add the ability to sign in with slack and omitt the current signin/signup methods
* Make the app responsive (mobile first)

There are probably more that we need to do to make this top notch but this is what we had in our current backlog. 

## Team
These are the original team members for this project. 
* Sara Överström (https://github.com/oversteem)
* Anders Wik Rydberg (https://github.com/luebiff)
* David Berg (https://github.com/b3rg3t)
* Fabian Forsström (https://github.com/fabifors)
