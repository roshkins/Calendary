Calendary.Routers.Calendars = Backbone.Router.extend({

	routes: {
		"calendar/:id/agenda/": "agenda",
		"calendar/new": "calendarNew",
		"calendar/:id/edit": "calendarEdit"
	},
	initialize: function ($calEl) {
		this.$calEl = $calEl;
	},

	currentView: null,

	swapCurrentView: function (view) {
		this.currentView && this.currentView.remove();
		this.$calEl.html(view.render().$el);
		this.currentView = view;
	},

	agenda: function (id) {
		var selectedCalendar = Calendary.current_user.get("calendars").get(id);
		var agendaView = new Calendary.Views.CalendarsAgenda(
			{model: selectedCalendar });
		this.swapCurrentView(agendaView);
	},

	calendarNew: function () {
		var collection = Calendary.current_user.get("calendars");
		var calendarsNewView = new Calendary.Views.CalendarsNew(
			{collection: collection});
		this.swapCurrentView(calendarsNewView);
	},

	calendarEdit: function (id) {
		var selectedCalendar = Calendary.current_user.get("calendars").get(id);
		var calendarsEditView = new Calendary.Views.CalendarsEdit(
			{model: selectedCalendar});
		this.swapCurrentView(calendarsEditView);
	}
});
