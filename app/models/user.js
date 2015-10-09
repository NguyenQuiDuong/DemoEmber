import DS from 'ember-data';


var user =  DS.Model.extend({
  role: DS.attr('number'),
  email:  DS.attr('string'),
  password: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  displayName: DS.attr('string'),
  fullName: DS.attr('string'),
  nickName: DS.attr('string'),
  createdDateTime: DS.attr('date'),
  rememberMe: DS.attr()
});

export default user;
