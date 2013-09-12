Calendary.Collections.Events = Backbone.Collection.extend({
	model: Calendary.Models.Event,
	initialize: function (models, options, cal_id) {
		this.calendar_id = cal_id;
	},
	url: function () {
		return "calendars/" + this.calendar_id + "/events";
	},

	// parse: function (stuff) {
	// 	debugger;
	// 	return stuff;
	// },
	comparator: function (event1, event2) {
						var date1 = Date.create(event1.get("start_datetime"));
						var date2 = Date.create(event2.get("start_datetime"));
						var num = -(date2 - date1)/Math.abs(date2 - date1);
						return isNaN(num) ? 0 : num;
    }
})