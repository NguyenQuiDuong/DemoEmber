import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: 'http://127.0.0.1:85/api/v2/user/session',
        async: true,
        type:'POST',
        dataType: 'json',
        data:JSON.stringify({
          "email": options['user.email'],
          "password": options['user.password'],
          "duration": 5
        }),
        contentType: 'application/json',
        beforeSend: function(xhr) {

        },
        success: function(json){

        },
        error: function(err) {
          console.log(err);
        }
      }).then(function(response) {
        Ember.run(function() {
          resolve({
            token: response.session_id
          });
        });
      }, function(xhr, status, error) {
        var response = xhr.responseText;
        Ember.run(function() {
          reject(response);
        });
      });
    });

  },

  invalidate(data) {
    console.log('Dang xuat');
    console.log(data);
    return Ember.RSVP.resolve();
  }
});
