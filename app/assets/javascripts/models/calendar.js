Calendary.Models.Calendar = Backbone.Model.extend({
	parse: function (attributes) {
			attributes.events = new Calendary.Collections.Events(
				attributes.events, {parse: true}, attributes.id);
		return attributes;
	}
});
