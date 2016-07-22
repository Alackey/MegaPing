# MegaPing
Get notified when a specific show is posted

## Contributing
1. Clone and cd into the megaping
2. ```npm install```
3. If you aren't using nodemon, open package.json and change ```"start": "nodemon ./bin/www"``` to ```"start": "node ./bin/www"```.
3. Open app.js, and change "username" and "password" to your reddit credentials. Alternatively you can create the "redditPass" environment variable for your password.

### PostgreSQL
1. Make sure you have PostgreSQL installed. 
2. Either change or use the settings for Postgresql in config/config.json
3. Type this in the terminal: ```node_modules/bin/sequelize db:migrate```

```npm start``` in root directory
