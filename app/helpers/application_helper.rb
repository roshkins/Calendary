module ApplicationHelper
	def current_user
		unless session[:token].blank?
			@current_user ||= User.find_by_session(session[:token])
		end
	end

	def logged_in?
		!!current_user
	end

	def login user
		session[:token] = user.session_token!
	end

	def logout
		current_user.session_token!
		session[:token] = nil
	end
end
