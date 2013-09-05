Calendary.Collections.Events = Backbone.Collection.extend({
	model: Calendary.Models.Event,
	initialize: function (models, options, cal_id) {
		this.calendar_id = cal_id;
	},
	url: function () {
		return "calendars/" + this.calendar_id + "/event";
	}
})