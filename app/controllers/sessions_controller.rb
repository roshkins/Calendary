class SessionsController < ApplicationController
	def new
		render :new
	end

	def create
		user = nil
		if user = User.fetch_valid_user(params[:user])
			login(user)
			redirect_to :root
		else
			flash[:errors] = "Username or password incorrect."
			redirect_to new_session_url
		end
	end

	def destroy
		logout
		redirect_to new_session_url
	end
end
