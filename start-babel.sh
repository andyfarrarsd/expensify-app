babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

yarn run dev-server  // to restart the dev server

yarn test -- --watch  // start the test script in watch mode in the background

yarn install --production // for just the production dependanices
yarn install // for all dev and prod dependanices

yarn run build:prod // to build the app and all dependacies

yarn run start // start the production server

git commit -am " comment  "   // to check in modified files
// need to run git add . // If there are new files

git push // goes to the default -origin GitHub
gut push heroku master // pushes to the heroku server we set up

heroku open // opens the default browser with the URL for the add just pushed