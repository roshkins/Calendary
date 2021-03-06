Calendary::Application.routes.draw do
  root :to => "root#root"

  resources :users, :only => [:new, :create, :destroy] do
  	resources :calendars, :only => [:index]
  end
  resource :user, :only => [:show]

  resource :session, :only => [:new, :create, :destroy]

  resources :calendars, :only => [:create, :update, :show, :destroy] do
  	# resource :event, :only => []
  	resources :events, :only => [:create, :update, :destroy]
  end
  	resources :events, :only => [:show]
end
