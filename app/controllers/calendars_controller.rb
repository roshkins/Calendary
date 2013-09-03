class CalendarsController < ApplicationController
	def show
		calendar = Calendar.find(params[:id])
		render :json => calendar
	end

	def create
		calendar = Calendar.new(params[:calendar])
		if calendar.save
			render :json => calendar
		else
			render :json => calendar.errors.full_messages
		end
	end

	def update
		calendar = Calendar.find(params[:id])
		if calendar.update_attributes(params[:calendar])
			render :json => calendar
		else
			render :json => calendar.errors.full_messages
		end
	end

	def destroy
		calendar = current_user.calendar.find(params[:id])
		if calendar.destroy
			render :json => calendar
		else
			render :json => calendar.errors.full_messages
		end
	end
end
