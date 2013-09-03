window.Calendary = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	$calendarEl = $("#calendar");
  	new Calendary.Routers.Calendars($calendarEl);
  	Backbone.history.start();
  	Backbone.history.navigate("agenda");
  }
};

$(document).ready(function(){
  Calendary.initialize();
});
