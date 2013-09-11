window.Calendary = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	$calendarEl = $("#calendar");
    $indexEl = $("#calendar_index");
    $toolbarTop = $("#toolbarTop");

    var current_user_calendars = Calendary.current_user.get("calendars");
    var calendarsIndex = new Calendary.Views.CalendarsIndex(
      {el: $indexEl, collection: current_user_calendars});
  	calendarsIndex.render(); 
    var toolbarsTopView = new Calendary.Views.ToolbarsTop({
      el: $toolbarTop
    });
    toolbarsTopView.render();
    new Calendary.Routers.Calendars($calendarEl, toolbarsTopView);
  	Backbone.history.start();

    if (Backbone.history.fragment == "") {
      if (current_user_calendars.length == 0)
      {
        Backbone.history.navigate("calendar/new", {trigger: true});
      } else {
    	 Backbone.history.navigate("calendar/" + current_user_calendars.at(0).id + "/agenda/", {trigger: true});
      }
    }
  }
};

$(document).ready(function(){
  if (window.location.pathname === "/" || window.location.pathname === ""){
    Calendary.initialize();
  }
});
