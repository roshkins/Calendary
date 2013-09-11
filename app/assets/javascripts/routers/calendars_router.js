Calendary.Routers.Calendars = Backbone.Router.extend({

	routes: {
		"calendar/:id/agenda": "calendarAgenda",
		"calendar/:id/agenda/": "calendarAgenda",
		"calendar/new": "calendarNew",
		"calendar/:id/edit": "calendarEdit",
		"calendar/:id/daily": "calendarDaily",

		"events/new": "eventsNew",
		"calendar/:calendar_id/events/:id/edit": "eventsEdit"
	},
	initialize: function ($calEl, toolbarsTopView) {
		this.$calEl = $calEl;
		this.toolbarsTopView = toolbarsTopView; 
	},

	currentView: null,

	swapCurrentView: function (view) {
		if (this.currentView && this.currentView.leave) {
			this.currentView.leave();
		}
		this.currentView && this.currentView.remove();
		this.$calEl.html(view.render().$el);
		this.currentView = view;
	},

	selectCalendar: function (id) {
		Calendary.selectedCalendar = Calendary.current_user.get("calendars").get(id);
		this.toolbarsTopView.render();
		return Calendary.selectedCalendar;
	},

	calendarAgenda: function (id) {
		var selectedCalendar = this.selectCalendar(id);
		var agendaView = new Calendary.Views.CalendarsAgenda(
			{model: selectedCalendar });
		this.swapCurrentView(agendaView);
	},

	calendarDaily: function (id) {
		var selectedCalendar = this.selectCalendar(id);
		var eventsCollection = selectedCalendar.get("events");
		var dailyView = new Calendary.Views.CalendarsDaily({
			collection: eventsCollection
		});
		this.swapCurrentView(dailyView);
		dailyView.secondRender();
	},

	calendarNew: function () {
		var collection = Calendary.current_user.get("calendars");
		var calendarsNewView = new Calendary.Views.CalendarsNew(
			{collection: collection});
		this.swapCurrentView(calendarsNewView);
	},

	calendarEdit: function (id) {
		var selectedCalendar = this.selectCalendar(id);
		var calendarsEditView = new Calendary.Views.CalendarsEdit(
			{model: selectedCalendar});
		this.swapCurrentView(calendarsEditView);
	},

	eventsNew: function () {
		var eventsNewView = new Calendary.Views.EventsForm();
		this.swapCurrentView(eventsNewView);
		
	},
	eventsEdit: function (calendar_id, event_id) {
		var currentEvent = this.selectCalendar(calendar_id).get("events").get(event_id);
		var eventsEditView = new Calendary.Views.EventsForm({model: currentEvent});
		this.swapCurrentView(eventsEditView);
	},
});
