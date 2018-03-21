### Build Time Prerender(prerender) Vs. Server Side Rendering(ssr)
This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Prerender(prerender)** 
* Happens at build time
* Renders your application and replaces the dist index.html with a version rendered at the route `/`.

**Server-Side Rendering(ssr)**
* Happens at runtime
* Uses `ngExpressEngine` to render your application on the fly at the requested url.

---

### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

### Production (also for testing SSR/Pre-rendering locally)
**`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4000`.



**`npm run build:prerender && npm run serve:prerender`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://localhost:8080`

**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`

// ==================================
// ====== SET UP INTRUCTIONS ========
// ==================================

client - npm install bootstrap, materials,
server - npm install express, body-parser, mysql

// Bootstrap link ----
add to angular-cli.json file -
"styles": [
   "../node_modules/bootstrap/dist/css/bootstrap.min.css",
   "styles.css"
],
// -- Materials ---
set up Materials

// -- Components and services ----
Add new components and services

ng g c components/componentname --module=app.module.ts
ng g s services/servicename --module=app.module.ts

--- Set up a Routing file ---
create Routing directory in app.

create routing directory and file - routing.module.ts
Add your routes here.

// ----- Running Server ---

npm run build:ssr && npm run serve:ssr

// If already built, you can run

npm run webpack:server
npm run serve:ssr




