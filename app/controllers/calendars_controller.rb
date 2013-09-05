class CalendarsController < ApplicationController
  before_filter :authorize
	def show
    calendar = Calendar.find(params[:id])    
    if current_user.has_show_permission?(calendar)
      render :json => calendar
    else
      render :json => "Permission denied", :status => :forbidden
		end
	end

	def create
			calendar = Calendar.new(params[:calendar])		
		begin
			ActiveRecord::Base.transaction do
				calendar.save!
				user_calendar = 
				UserCalendar.new(:calendar_id => calendar.id,
								 :user_id => current_user.id,
								 :permission_setting => "make changes to events")
				user_calendar.save!
			end
			render :json => calendar
		rescue
			render :json => calendar.errors.full_messages * ", " , :status => 422
		end
	end

	def update
		calendar = Calendar.find(params[:id])
		if current_user.has_update_permission?(calendar)
			if calendar.update_attributes(params[:calendar])
				render :json => calendar
			else
		    render :json => calendar.errors.full_messages * ", "
			end
    else
      render :json => "Permission denied.", :status => :forbidden
    end
	end

	def destroy
		calendar = Calendar.find(params[:id])
    if current_user.has_update_permission?(calendar)
  		if calendar.destroy
  			render :json => calendar
  		else
  			render :json => calendar.errors.full_messages * ", "
  		end
    else
      render :json => "Permission denied.", :status => :forbidden
    end
  end
end
