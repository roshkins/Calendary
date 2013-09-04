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
    if (current_user_calendars.length == 0)
    {
      Backbone.history.navigate("calendar/new", {trigger: true});
    } else {
  	 Backbone.history.navigate("calendar/" + current_user_calendars.at(0).id + "/agenda/", {trigger: true});
    }
  }
};

$(document).ready(function(){
  Calendary.initialize();
});
