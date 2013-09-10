Calendary.Models.Calendar = Backbone.Model.extend({
	parse: function (attributes) {
        console.log(attributes.events);
			attributes.events = new Calendary.Collections.Events(
				_.filter(attributes.events, function (dateObj) {
					var value = Date.parse(dateObj.start_date) + Date.parse(dateObj.start_time);					
					var date = (new Date(value));
					return date - (new Date()) > 0;
				})
				, {
					parse: true					
				}, attributes.id);
		return attributes;
	}
});
