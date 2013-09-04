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
		var agendaView = new Calendary.Views.CalendarsAgenda(
			{model: selectedCalendar });
		this.$calEl.html(agendaView.render().$el);
	},

	calendarNew: function() {
		var collection = Calendary.current_user.get("calendars");
		var calendarsNewView = new Calendary.Views.CalendarsNew(
			{collection: collection});
		this.$calEl.html(calendarsNewView.render().$el);
	}
});
