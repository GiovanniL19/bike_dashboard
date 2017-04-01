import Ember from 'ember';

export default Ember.Controller.extend({
  selectedOrder: null,
  processingItems: 0,
  missingItems: 0,
  completeItems: 0,

  chartData: null,

  addData: function(){
    var data = [this.get("processingItems"), this.get("missingItems"), this.get("completeItems")];
    var chartData = {
      labels: ["Processing", "Missing Items", "Complete"],
        datasets: [
        {
          label: "Orders",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
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
  }.observes("processingItems", "missingItems", "completeItems"),

  processingItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isProcessing")){
        controller.set("processingItems", controller.get("processingItems") + 1);
      }
    });
  }.observes("model"),

  missingItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isMissingItems")){
        controller.set("missingItems", controller.get("missingItems") + 1);
      }
    });
  }.observes("model"),

  completeItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isComplete")){
        controller.set("completeItems", controller.get("completeItems") + 1);
      }
    });
  }.observes("model"),

  actions: {
    select(order){
      this.set("selectedOrder", order);
    }
  }
});
