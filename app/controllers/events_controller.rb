class EventsController < ApplicationController

  before_filter :authorize

  before_filter :permission_update, :only => [:update, :destroy]
  before_filter :permission_show, :only => [:show]
  before_filter :permission_calendar_update, :only => [:create] 

	def create
		event = Event.new(params[:event])
		calendar = @calendar
		calendar.events << event
    event.all_day = (params[:event][:all_day] == "true")
    event.start_time = Chronic.parse(params[:event][:start_time])
    event.end_time = Chronic.parse(params[:event][:end_time])
		if event.save
			render :json => event
		else
			render :json => event.errors.full_messages * ", ", :status => :unprocessable_entity
		end
	end

	def update
    event = @event
		if event.update_attributes(params[:event])
      event.all_day = (params[:event][:all_day] == "true")
      event.start_time = Chronic.parse(params[:event][:start_time])
      event.end_time = Chronic.parse(params[:event][:end_time])
      render :json => event
	  else
			render :json => event.errors.full_messages * ", ", :status => :unprocessable_entity
		end
	end

	def show
			render :json => @event
	end

  def destroy
    if @event.destroy
      render :json => @event
    else
      render :json => @event, :status => :unprocessable_entity
    end
  end

  def permission_update
    @event = Event.find(params[:id])
    unless @event.has_update_permission?(current_user)
      render :json => "permission denied", :status => :forbidden
    end
  end

  def permission_show
    @event = Event.find(params[:id])
    unless @event.has_show_permission?(current_user)
      render :json => "permission denied", :status => :forbidden
    end
  end

  def permission_calendar_update
    @calendar = Calendar.find(params[:calendar_id])
    unless current_user.has_update_permission?(@calendar)
      render :json => "permission denied", :status => :forbidden
    end
  end
end