import Ember from 'ember';

export default Ember.Controller.extend({
  selectedOrder: null,
  aConfirmation: 0,
  aMaterials: 0,
  inProduction: 0,
  complete: 0,
  ready: 0,

  chartData: null,

  addData: function(){
    var data = [this.get("aConfirmation"), this.get("aMaterials"), this.get("inProduction"), this.get("complete"), this.get("ready")];
    var chartData = {
      labels: ["Awaiting Confirmation", "Awaiting Materials", "In Production", "Complete (Awaiting Inspection)", "Ready To Dispatch"],
      datasets: [
        {
          label: "Orders",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(97, 181, 232, 1)",
          borderColor: "rgba(97, 181, 232, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(97, 181, 232, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(97, 181, 232, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data,
          spanGaps: false,
        }
      ]
    };
    this.set("chartData", chartData);
  }.observes("aConfirmation", "aMaterials", "inProduction", "complete", "ready"),

  aConfirmationObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Awaiting Confirmation"){
        controller.set("aConfirmation", controller.get("aConfirmation") + 1);
      }
    });
  }.observes("model"),

  aMaterialsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Awaiting Materials"){
        controller.set("aMaterials", controller.get("aMaterials") + 1);
      }
    });
  }.observes("model"),

  inProductionObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "In Production"){
        controller.set("inProduction", controller.get("inProduction") + 1);
      }
    });
  }.observes("model"),

  completeObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Complete"){
        controller.set("complete", controller.get("complete") + 1);
      }
    });
  }.observes("model"),

  readyObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Ready To Dispatch"){
        controller.set("ready", controller.get("ready") + 1);
      }
    });
  }.observes("model"),

  actions: {
    select(order){
      this.set("selectedOrder", order);
    }
  }
});
