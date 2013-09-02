CalendarApp::Application.routes.draw do
  root :to => "root#root"
  resources :users, :only => [:new, :create, :destroy]

  resource :session, :only => [:new, :create, :destroy]
end
