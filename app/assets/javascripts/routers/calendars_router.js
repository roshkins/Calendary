Calendary.Routers.Calendars = Backbone.Router.extend({

	routes: {
		"agenda": "agenda"
	},
	initialize: function($calEl) {
		this.$calEl = $calEl;
	},

	agenda: function () {
		var agendaView = new Calendary.Views.CalendarsAgenda({el: this.$calEl[0]});
		agendaView.render();
	}
});
