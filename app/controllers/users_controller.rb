class UsersController < ApplicationController
	before_filter :authorize, :except => [:new, :create]
		def new
		@user = User.new
		render :new
	end

	def create
		@user = User.new(params[:user])
		if @user.save
			login(@user)
			redirect_to :root
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end

	def destroy
		current_user.destroy
		@user = current_user
		render :new
	end

	def show
		render :json => current_user
	end

end
