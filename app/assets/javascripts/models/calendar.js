Calendary.Models.Calendar = Backbone.Model.extend({
	parse: function (attributes) {
			attributes.events = new Calendary.Collections.Events(
				_.filter(attributes.events, function (dateObj) {
					debugger;
					var date = new Date(dateObj.start_time);
					return date - (new Date()) > 0;
				}), {
					parse: true					
				}, attributes.id);
		return attributes;
	}
});
