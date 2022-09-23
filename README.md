# streamelements-copy-commands
Copy bot commands from one stream elements account to another --- My usecase Twitch to Youtube

## Usage
Clone the repository to your local system

`git clone https://github.com/jctrvlr/streamelements-copy-commands.git`

Run npm install to install the dependencies
`cd streamelements-copy-commands && npm install`

Edit index.js and replace streamName, streamerId, and authToken at the top of the file -- See below for instructions how to get the values
```
var streamName = 'streamname';
var streamerId = '123456789';
var authToken = '123456789_longtoken_verylong';
```

#### Stream Name
Get streamname from whatever you !commands page is ie. https://streamelements.com/bajheera/commands
#### StreamerId and AuthToken
Go to streamelements dashboard for the account you want to copy commands to, then open the devtools in google chrome. Next go to bot commands and create a test command. Watch for the api call that calls `https://api.streamelements.com/kappa/v2/bot/commands/${streamerId}` -- This is your streamerId. That same call look at the request headers and take the header that looks like authorization: Bearer ${authToken}

Once you're done with grabbing streamerId and authToken save the file then run `node index.js` with Node Version 16+

Feel free to reach out if you have any questions or make an issue.
Twitter: @thehamsti
