import DS from 'ember-data';
import Ember from 'ember';

/*
 * namespace for the DSP Adapter
 */
var EmberDreamFactoryAdapter = {};

/*
 * Serializer overrides
 */
EmberDreamFactoryAdapter.Serializer = DS.RESTSerializer.extend({

  extractArray: function(store, primaryType, payload) {
    var namespacedPayload = {};
    namespacedPayload[Ember.String.pluralize(primaryType.typeKey)] = payload.record;
    return this._super(store, primaryType, namespacedPayload);
  },

  extractSingle: function (store, primaryType, payload, recordId) {
    var namespacedPayload = {};
    namespacedPayload[primaryType.typeKey] = payload.record[0];
    return this._super(store, primaryType, namespacedPayload, recordId);
  },

  typeForRoot: function (key) {
    return Ember.String.dasherize(Ember.String.singularize(key));
  },

  serialize: function (record, options) {
    options = options || { includeId: true };
    return this._super(record, options);
  },

  // set the JSON root to 'record' to make DSP happy
  serializeIntoHash: function (data, type, record, options) {
    var root = 'record';
    data[root] = this.serialize(record, options);
  }
});

/*
 * An Ember Data Adapter written to use DreamFactory REST API
 * @type {DS.RESTAdapter}
 */
export default EmberDreamFactoryAdapter.Adapter = DS.RESTAdapter.extend({

  defaultSerializer: '-dreamfactory',

  init: function () {
    this._super();
    this.set('host' ,'http://127.0.0.1:85');
    this.set('namespace', 'api/v2/bitnami_dreamfactory/_table');
    this.set('headers', {
      'X-DreamFactory-Application-Name': 'DemoEmber',
      'X-Dreamfactory-Api-Key': '54aab3abcf8cbad6fafc48df3748f96e9a2840a840917cd4d2d3ee7dd0e29b66',
      //'X-Dreamfactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODVcL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOiIxNDQ0Mjg3NjgwIiwiZXhwIjoiMTQ0NDI5MTI4MCIsIm5iZiI6IjE0NDQyODc2ODAiLCJqdGkiOiJkMTk3MzM2MmY1YjJjZGRiNDBjOGY5MjljNmIzNDMwOSJ9.WmmgOlhaHWdh6YQto7mWV1fJuIWM9R8NSZ0m1-zIT0s'
    });
  },

  findQuery: function (store, type, query) {
    console.log(store);
    if (typeof query.procedure !== 'undefined') {
      // A stored procedure was requested. Alter buildUrl to use the correct API path
      var proc = query.procedure;
      var data = {};
      var httpRequestType = 'GET';	// default request to GET
      var adapter = this;

      // remove the procedure property from the query object
      delete query.procedure;

      // Test to see if the query has additional properties. If so we need to change the httpRequestType to a HTTP POST
      if (!this.isEmpty(query)) {
        httpRequestType = 'POST';
      }

      // the serializer expects all results to be wrapped in a 'record' object so we add that here
      query.wrapper = 'record';

      return new Ember.RSVP.Promise(function(resolve, reject) {
        adapter.ajax(adapter.buildProcUrl(proc), httpRequestType, { data: query }).then(function(json) {
          resolve(json);
        }, function(reason) {
          reject(reason.responseJSON);
        });
      });
    } else {
      // normal call so we use the normal findQuery
      return this._super(store, type, query);
    }
  },

  // Used https://github.com/clintjhill/ember-parse-adapter/blob/master/dist/ember-parse-adapter.js#L290 as a starting point
  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);
    serializer.serializeIntoHash(data, type, record);
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.ajax(adapter.buildURL(type.typeKey, id), "POST", { data: data }).then(function(json){
        // if the request is a success we'll return the same data we passed in
        var completed = Ember.merge(data.record, json);
        resolve(completed);
      }, function(reason){
        reject(reason.responseJSON);
      });
    });
  },

  // Used https://github.com/clintjhill/ember-parse-adapter/blob/master/dist/ember-parse-adapter.js#L290 as a starting point
  updateRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);
    serializer.serializeIntoHash(data, type, record);
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      // hack to make DSP send back the full object
      adapter.ajax(adapter.buildURL(type.typeKey) + '?fields=*', "PUT", { data: data }).then(function(json){
        // if the request is a success we'll return the same data we passed in
        resolve(json);
      }, function(reason){
        reject(reason.responseJSON);
      });
    });
  },

  pathForType: function (type) {
    return Ember.String.decamelize(type);
  },

  buildProcUrl: function (proc) {
    var url = [],
      host = this.get('host'),
      prefix = this.urlPrefix();

    url.push('_proc');
    url.push(proc);

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');

    return url;
  },

  // tests for an empty object
  isEmpty: function (obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },

  sessionToken: Ember.computed('headers.X-DreamFactory-Session-Token', function (key, value) {
    if (arguments.length < 2) {
      return this.get('headers.X-DreamFactory-Session-Token');
    } else {
      this.set('header.X-DreamFactory-Session-Token', value);
      return value;
    }
  })
});

EmberDreamFactoryAdapter.setupContainer = function(container) {
  container.register('serializer:-dreamfactory', EmberDreamFactoryAdapter.Serializer);
};

/**
 * Setup the DSP Adapter in the app.
 */
Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    after: "ember-data",
    name: 'dreamfactory-adapter',
    initialize: function(container, application) {
      EmberDreamFactoryAdapter.setupContainer(container);
    }
  });
});
//export default DS.RESTAdapter.extend({
//  host: 'http://127.0.0.1:85',
//  namespace: 'api/v2/Ember/_table',
//  applicationName: 'DemoEmber',
//  'api_key': '54aab3abcf8cbad6fafc48df3748f96e9a2840a840917cd4d2d3ee7dd0e29b66',
//  applicationName: 'todojquery',
//  headers: {
//    'api_key': '54aab3abcf8cbad6fafc48df3748f96e9a2840a840917cd4d2d3ee7dd0e29b66',
//    app_name: 'DemoEmber'
//  }
//});
