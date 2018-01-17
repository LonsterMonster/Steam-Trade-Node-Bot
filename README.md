# Steam-Node-Bot v1.5

1. Unpack the files to your Desktop or where ever you want it

2. go to Command Prompt

3. type the following into command propt
    a. cd Directory of files 
    b. npm install mathjs
    c. npm install steam-user
    d. npm install steam
    e. npm install steam-totp
    f. npm install steam-tradeoffer-manager
    e. npm install raven
    g. npm install tf2


4. go to the setting folder

5. go to config.json and put your username, password, sharedsecret, identitysecret, ownerID

Username = Bot Username
Password = Bot Password
Sharedsecret = Shared Secret from desktop authenticator
Identity Secret = Identity Secret from Desktop Authenticator
OwnerID = Bot owner ID64
"GroupLink": "Your Group Link HEre",
"Comments": "Enable", Enables and Disables Comments on user Profiles
"IssueTracking": "Enable", Enable/Disables Issue Tracking 
NOTE if Disabled might be hard to help if you encounter a problem with the code
"GroupID": "GroupId here",
"Hatbanking": "Enable", Enables/disable Hat Banking 
"KeyBanking": "Disable",Enables/disables Key banking
NOTE: try to have only one Enabled ATM havent tested it with them both enabled
"Group" : "Group Name Here",
"chats": "true" //Enables manual chats for the bot to communitcate to other users with chat messages

6. go to GamesPlayed.json and make sure the games are set correctly

Games1 = Listed Game
Games2 = Game ID

7. go to messages.json and make sure everything is done correctly 

8. go to prices check to make sure the items you want to buy and  sell is in it and expample is below and on the prices.json

{
"Steam Market Name of item"
{
"buy": Price,
"sell: Price
}
}

9. Got to Stock.json under Stock folder in settings
Here you will edit stock amounts 
{
"item name has to be the steam market name"
{
"instock": 0,
"stocklimit": 0
}
}

10. Go to Messages/messages.json
make sure the messages are right for the items

11. Go to keysmessage.json and edit them if needed

12. Go to Hatsmessage.json and edit them if needed

13. Go to Settings/Comments/comments.json Edit them if needed
NOTE: Comments are currently set to only comment after a trade success not if it was cancelled or declined

14. Go to Settings/config.json
Edit anything that u do or dont want to be enabled

15. Make a new text file

16 .Name it Run Bot.bat

17. Edit it and put the following code: node bot.js press ENTER  type pause
it will look like this 

node bot.js
pause

18. Run the Run Bot.bat to run the bot

HAVE ANY PROBLEMS POST YOUR PROBLEM HERE ON THE GITHUB REPO OR USE OUR STEAM GROUP steamcommunity.com/groups/MarketWH
