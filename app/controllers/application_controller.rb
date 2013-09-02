class ApplicationController < ActionController::Base
  protect_from_forgery
  include ApplicationHelper

  def authorize
  	unless logged_in?
  		redirect_to new_session_url
  	end
  end
end
