import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import {join} from 'path';
import {readFileSync} from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// ROUTE TO API =====
// ===========================
// GET DOGS FOR LIST ====
// ===========================
app.get('/api/getDogList', (req, res) => {
	console.log(req.body);
})


// ===========================
// ROUTER TO POST A DOG ===
// ===========================
app.post('/api/addDog', (req, res) => {
	// console.log the data sent to the server from the form...
  //console.log(req.body);
  const data = req.body;
  
  if(data != undefined){
    console.log(data.name);
  
    // Set the headers
    var headers = { 'Content-Type': '*' };
     
     //Set the body for the Api
     var apiBody = {
        
        "alps": {
        "version": "1.0",
        "descriptors": [{
            "id": "dog-representation",
            "href": "http://test-dogs.ordretecha.com:8080/profile/dogs",
            "descriptors": [{
                "name": data.name,
                "type": "SEMANTIC"
              }, {
                "name": data.breed,
                "type": "SEMANTIC"
              }]
          }, {
            "id": "create-dogs",
            "name": "dogs",
            "type": "UNSAFE",
            "rt": "#dog-representation"
          }]
        }

    };

       // Configure the request
       var options = {
         url: 'http://test-dogs.ordretecha.com:8080/dogs',
         method: 'POST',
         headers: headers,
         body: apiBody,
         json: true
       };

       // Request to add dog, if err will return fail else it's success.
       request(options, function (error, response, body) {
       

        console.log(body);


         if (!error && response.statusCode == 200) {
           
            console.log('Success');
            //console.log(body.result[0])
             res.json({
               'status' : 'Success',
               'type': 'DogAdded',
               'message': 'Dog Added.',
               'name' : body.result[0].name,
               'breed' : body.result[0].breed,
               });

         } else {
           // Return false there was an error
           console.log(error);
         } // end of else.

       }); // end of request


   } else {
       // Fail Invalid values posted simple error message
       res.json(
        { 'status' : 'fail',
          'type': 'invalidValues',
          'message': 'Invalid.'
        });
   } // end of else
}) // End of Post =========


// =========================
// =========================

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
