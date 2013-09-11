Calendary.Views.CalendarsDaily = Backbone.View.extend({
	template: JST['calendars/daily'],


	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	initialize: function () {
		$(window).on('resize', this.secondRender.bind(this));
	},

	innerViews: [],
	secondRender: function () {
		var that = this;
		this.collection.each(function (event) {
			var eventView = new Calendary.Views.EventsDailyShow({
				model: event
			});
			var startTime = new Date(event.get("start_time"));
			var hourElm = that.$("#hour" + (startTime.getHours()));
			eventView.render(hourElm.height());
			var eventEl = eventView.$el;
			that.innerViews.push(eventView);
			eventEl.css("position", "absolute");
			var numEventsAtSameTimeSlot = that.collection.filter(function (eventToCompare) {
				return startTime.getHours() === (new Date(eventToCompare.get("start_time"))).getHours();
			}).length;
			eventEl.width((hourElm.width() - 20) / numEventsAtSameTimeSlot);
			eventEl.css('top', hourElm.offset().top);
			eventEl.css('left', hourElm.offset().left);
			that.$el.append(eventEl);
		});
	},

	leave: function () {
		_(this.innerViews).each(function (innerView) {
			innerView.remove();
		});
		$(window).off('resize');
	},
});