Calendary.Models.Event = Backbone.Model.extend({
	full_start_datetime: function () {
		var fullDate = new Date(Date.parse(this.get("start_date")) + Date.parse(this.get("start_time")));
		return fullDate;
	},
	full_end_datetime: function () {
		var fullDate = new Date(Date.parse(this.get("end_date")) + Date.parse(this.get("end_time")));
		return fullDate;
	},

});