class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :session
      t.string :email_address

      t.timestamps
    end
  end
end
