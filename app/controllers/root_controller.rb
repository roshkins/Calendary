class RootController < ApplicationController
	before_filter :authorize
	
	def root
		render :root
	end
end
