Calendary.Routers.Calendars = Backbone.Router.extend({

	routes: {
		"calendar/agenda/:id": "agenda"
	},
	initialize: function($calEl) {
		this.$calEl = $calEl;
	},

	agenda: function (id) {
		var selectedCalendar = Calendary.current_user.get("calendars").get(id);
		var agendaView = new Calendary.Views.CalendarsAgenda({el: this.$calEl[0], model: selectedCalendar });
		agendaView.render();
	}
});
