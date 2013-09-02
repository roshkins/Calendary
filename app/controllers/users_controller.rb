class UsersController < ApplicationController
	before_filter :authorize, :except => [:new, :create]
		def new
		@user = User.new
		render :new
	end

	def create
		user = User.new(params[:user])
		if user.save
			user.session_token!
			redirect_to :root
		else
			flash.now[:error] ||= user.errors.full_messages
			render :new
		end
	end

	def destroy
		current_user.destroy
		@user = current_user
		render :new
	end

end
