Calendary.Routers.Calendars = Backbone.Router.extend({

	routes: {
		"calendar/agenda/:id": "agenda",
		"calendar/new": "calendarNew"
	},
	initialize: function($calEl) {
		this.$calEl = $calEl;
	},

	agenda: function (id) {
		var selectedCalendar = Calendary.current_user.get("calendars").get(id);
		var agendaView = new Calendary.Views.CalendarsAgenda({el: this.$calEl[0], model: selectedCalendar });
		agendaView.render();
	},

	calendarNew: function() {
		var collection = Calendary.current_user.get("calendars");
		var calendarsNewView = new Calendary.Views.CalendarsNew(
			{el: this.$calEl[0], collection: collection});
		calendarsNewView.render();
	}
});
