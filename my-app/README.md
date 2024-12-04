# Poll Widget Codebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


* Once a feature is finalised run `npm run build` to generate new files under build/static directory. Once done copy the entire static directory to the HTML project's root folder. 

* Everytime the widget/react code is changed, a production build needs to be build and the "static" folder needs to be copied in the DEMO HTML project folder. The 3 file names i.e. the css and the last two .js files should match with the file names in the static folder.

* Working : There are two poll questions configured in the App.js file in a variable named initializepollquestions , whichever page loads first in the HTML DEMO they get a poll each , the third page does not get any poll. The entire poll object is stored in the localstorage.

* optimization :  There is a way to overcome the above issue of renaming files on every build by overriding configurations in the webpack 

* optimization : The widget can be further beautified/ animated etc... with images/svg's etc.. and css.