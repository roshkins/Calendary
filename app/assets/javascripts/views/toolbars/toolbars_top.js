Calendary.Views.ToolbarsTop = Backbone.View.extend({
	template: JST['toolbars/top'],
	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});