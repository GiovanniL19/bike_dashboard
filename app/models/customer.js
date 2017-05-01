import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'Customer'}),
  transactions: hasMany("transaction", {async: true, defaultValue: []}),
  fullName: attr("string"),
  deliveryLocation: attr("string"),
  billingLocation: attr("string"),
  number: attr("string"),
  email: attr("string"),
  paymentFlag: attr("string"),
});
