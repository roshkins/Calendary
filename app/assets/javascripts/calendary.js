window.Calendary = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	$calendarEl = $("#calendar");
    $indexEl = $("#calendar_index");

    var current_user_calendars = Calendary.current_user.get("calendars");
    var calendarsIndex = new Calendary.Views.CalendarsIndex(
      {el: $indexEl, collection: current_user_calendars});
  	calendarsIndex.render(); 
    new Calendary.Routers.Calendars($calendarEl);
  	Backbone.history.start();
  	Backbone.history.navigate("calendar/agenda/" + current_user_calendars.at(0).id);
  }
};

$(document).ready(function(){
  Calendary.initialize();
});
