# AS Hackathon
## Settings up Your Hackathon Demo

To build a local repo for the Hackthon first clone the repo in the root folder for your project

### `git clone https://github.com/phatphauxe/as-hackathon.git`

Once you have the repo cloned be sure to run 

### `npm install`

If you are ready to test your build first ensure you are pointed to the right location
## Local Setup
In the file founde at /public/index.html

Make sure the script tag src is set to http://localhost:5000/api/map/js?key=6fa733b4-0285-4a4e-ada3-8e1cf7d22038
Open your local asn and run the following commands in your asn project directory

### `nx serve experience-360-server`
### `nx serve experience-360-api-viewer`

Once these two items are running you should be good to call in your AS-Hackathon project directory

### `npm start`

If everything goes to plan your project should be running at on your dev address [http://localhost:3000](DEV).


## Hosted Setup

Head over to [https://firebase.google.com](Firebase) and follow the steps to setup a new project.

**NOTE: Do not use your work account to set up the project** 
Once complete within your project directory run 
### `npm install -g firebase-tools`

Login to the google account used to create the firebase project with

### `firebase login` 

Initialize your firebase setup
### `firebase init`

Follow the set up steps found [https://aerialsphere.atlassian.net/wiki/spaces/AS/pages/706347009/AS+Hackathon](Here) if needed to setup the project.

Once the project is setup with firebase you can get it deployed.

In the file founde at /public/index.html

Make sure the script tag src is set to https://dev.app.aerialsphere.com/api/map/js?key=6fa733b4-0285-4a4e-ada3-8e1cf7d22038

### `npm run build`
### `firebase deploy`

Once deployed you can go to the logged url to view your hosted site.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
