Calendary.Models.Event = Backbone.Model.extend({
	full_start_datetime: function () {
		var fullDate = Date.create(this.get("start_datetime"))
		return fullDate;
	},
	full_end_datetime: function () {
		var fullDate = Date.create(this.get("end_datetime"));
		return fullDate;
	},

});