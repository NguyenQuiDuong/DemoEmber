/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'demo-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' code.jquery.com use.typekit.net connect.facebook.net maps.googleapis.com maps.gstatic.com",
      'font-src': "'self' data: fonts.googleapis.com netdna.bootstrapcdn.com  fonts.gstatic.com",
      'connect-src': "'self' 127.0.0.1:85 ",
      'img-src': "'self' www.facebook.com www.codementor.io cdn.codementor.io",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com use.typekit.net netdna.bootstrapcdn.com",
      'frame-src': "s-static.ak.facebook.com static.ak.facebook.com www.facebook.com"
    },
  };

  ENV['simple-auth'] = {
    //store: 'simple-auth-session-store:cookie',
    authenticationRoute: 'signin',
    authorizer: 'simple-auth-authorizer:custom',
    routeAfterAuthentication:'/user/dashboard',
    crossOriginWhitelist: ['http://127.0.0.1:85/'],
    authenticationRoute: '/user/signin',
    routeIfAlreadyAuthenticated: 'user/dashboard',
  };
  ENV['simple-auth-cookie-store'] = {
    cookieDomain: 'localhost:4200'
  }
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

  }

  if (environment === 'production') {

  }

  return ENV;
};
