class CreateLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :links do |t|
      t.string        :original_url
      t.string        :unique_identifier
      t.references    :user
      t.timestamps
    end
  end
end
