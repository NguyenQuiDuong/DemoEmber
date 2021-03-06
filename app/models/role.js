import DS from 'ember-data';

var role =  DS.Model.extend({
  role: DS.attr('number'),
  email:  DS.attr('string'),
  password: DS.attr('string'),
  fullName: DS.attr('string'),
  nickName: DS.attr('string'),
  createdDateTime: DS.attr('date')
});

export default role;
