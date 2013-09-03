class CreateUserCalendars < ActiveRecord::Migration
  def change
    create_table :user_calendars do |t|
      t.integer :user_id
      t.integer :calendar_id
      t.string :permission_setting

      t.timestamps
    end
    add_index :user_calendars, [:user_id, :calendar_id], :unique => true
    add_index :user_calendars, :user_id
    add_index :user_calendars, :calendar_id
  end
end
