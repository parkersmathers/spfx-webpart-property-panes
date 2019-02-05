# Custom Property Pane Control, using React with the Sharepoint Framework API

This demo leverages the property pane for client-side web parts.
It includes the following:

* src/controls/* - custom property pane controls
* src/webparts/* — out-of-the-box property types supported in the property pane

## Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Built w/

* Sharepoint Framework API
* React
* React-DOM
* Fabric React
* Gulp
* Webpack
* TypeScript

### Build options

gulp clean gulp test gulp serve gulp bundle gulp package-solution
