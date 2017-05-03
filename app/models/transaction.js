import DS from 'ember-data';
import moment from 'moment';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'Order'}),
  manifest: belongsTo("manifest"),
  transactionID: attr("string"),
  dateCreated: attr("number"),
  eta: attr("number"),
  status: attr("string", {defaultValue: "PROCESSING"}),
  customer: belongsTo("customer", {async:true}),
  bikeType: attr("string"),
  forWeek: attr("number"),

  orderDateFormatted: function () {
    return moment.unix(this.get("dateCreated")).format("DD/MM/YYYY");
  }.property("dateCreated"),
  etaFormatted: function () {
    return moment.unix(this.get("eta")).format("DD/MM/YYYY");
  }.property("eta"),
  etaHuman: function(){
    if(this.get("status") === "DELIVERED") {
      return "DELIVERED";
    }else if(this.get("status") === "MISSING ITEMS") {
      return "MISSING ITEMS";
    }else{
      return moment.unix(this.get("eta")).fromNow();
    }
  }.property("eta", "status"),

  isOrange: function(){
    if(this.get("status") === "In Production") {
      return true;
    }else{
      return false;
    }
  }.property("status"),
  isRed: function(){
    if(this.get("status") === "Awaiting Materials" || this.get("status") === "Awaiting Confirmation") {
      return true;
    }else{
      return false;
    }
  }.property("status"),
  isGreen: function(){
    if(this.get("status") === "Ready To Dispatch" || this.get("status") === "Complete") {
      return true;
    }else{
      return false;
    }
  }.property("status")
});
