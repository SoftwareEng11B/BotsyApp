Software Engineering Team #11B - BotsyApp


Heroku Deployed Site: 

Credit to: 
 - Bootstrap 
 - Google API
 - FabricJS
 - FileSaver 
 - FileReader 
 - FileStack 
 - Modernizr
 
 
 
 Features of the whole app: 
 
 Home Page: https://imgur.com/a/oIYoa
 
 Features: Sign Up (As either customer or artist, allowing artist to prefill more information about themselves), Sign In (as customer,artist or admin), Contact us and Learn more linked to botsy.com websire. 
 
 Customer Home Page: https://imgur.com/a/ffSNF
 
 Feature: Start Mural Request ( See below for more information), Customer Information (Can sign out and edit information), See Current walls. 
 
 Artist View Jobs: https://imgur.com/a/ONa5D 
 
 Feature: Once the Artist signs in they have a simple home page that allows them to go to this page to see the wall they have matched to so they can complete that Job. This wall is similar layout to what Customers see when they click see current walls. 
 
 Admin Home Page: https://imgur.com/a/ZOUzW 
 
 Feature: Home page is list walls in which it list all the walls, the walls needed to be quotes and walls needed to be matched. As an admin you can also see the list of users and edit those users/ 
 
 Mural Request Flow: 
 
 1. You select what type of mural request it is? Drag and Drop and Logo means the Customer will design there own and custom mural means that need a graphic designer to design it for them. https://imgur.com/a/Xs30p
 
 Drag and Drop : https://imgur.com/a/Ko0H8
 
 2. Then you continue to fill out information on the new wall page https://imgur.com/a/v213D
	
	
	
How to run locally: 
	1. Git clone the file  
	2. Make sure you are on the master branch 
	3. Grunt --force 
	
	Be sure that you npm, mongodb install 
	Follow this for help: https://docs.google.com/document/d/1gl-KM2EHZ2jHWgrjN9Pi8CZXeAMpi-ztqbn5l_83DrE/edit 
	
	
Database : 

Issues:
	- Be sure to fill in information for transporter information 
	- Be sure to use grunt --force 
	- Be sure to fill in database information 
	
Not Implement Features:
 	- pricing (no code written) 
	- link to shopify (no code written)
	- progress bar (some code written) 
	- matching(some code written) 
	- better implementation of artist (some code written)
	- better schedule for artist (some code written) 
	- matching more than one artist (some code written) 
	
	
	
**** For Liza ******	
To change the nodemail to another email go to : BotsyApp/modules/users/server/controllers/users/users.authentication.server.controller.js on line 251-252 for a gmail account. 
 
 Then you must repush the information to heroku: 
 Go to the location of the github code. 
 Be sure to be on the master branch: git branch then it should highlight green master
 Be sure to run: git pull 
 Then run git remote -v 
 Be sure to have heroku. 
 Then run git push heroku master 
 
 If it doesnt work contact either Jon Legaspi or Kemley Nieva. 
 
 
 
 
