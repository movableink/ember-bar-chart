import AddonDocsRouter, { docsRoute } from "ember-cli-addon-docs/router";
import config from "./config/environment";

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    this.route("usage");
    this.route("dynamic-data");

    this.route("cookbook", function () {
      this.route("custom-height");
      this.route("labels");
    });
  });
});
