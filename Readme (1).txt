#pre requisites,
proper cloud account, installed node.js(npm), angular  and visual code .
#Running Angular
1)move to ven_app/ven_app/ folder.
2)now run the angular front end with the command "ng serve --open"(the front end should compile succesfully, given you have installed node.js and angular, which can be accessed through internet)
3)the app runs on the port 4200
4)open  the browser and open link "http://localhost:4200/"

#Running Express js
1)move to folder ven_app/node/server.js .
2)now run the server with the command "node server.js"
3)given you have provided correct credetials for the cloud database, with correct port number , the server should run successfully.
4)after both angular and server.js your angular UI should be functional .

#cloud database
1) you can choose, any cloud database(we did on Azure SQL) of your choice and import the database through .sql file attached.
2) add firewall exception to the cloud by adding your system ip address under public network.
->you can find the ip address of your device through command "curl ipconfig.me"
3)access the internet, if you face any problems