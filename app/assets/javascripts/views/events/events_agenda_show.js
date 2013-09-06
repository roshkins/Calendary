Calendary.Views.EventsAgendaShow = Backbone.View.extend({
	template: JST['events/agenda_show'],

	render: function () {
		var content = this.template({event: this.model});
		this.$el.html(content);
		return this;
	}
});