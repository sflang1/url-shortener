class Link < ApplicationRecord
  belongs_to    :user, optional: true

  before_validation           :assign_unique_identifier
  validates_uniqueness_of     :unique_identifier
  validates_presence_of       :unique_identifier, :original_url
  validates :original_url,    url: { schemes: ['http', 'https'] }


  private
  def url_is_valid?
    self.original_url
  end

  def assign_unique_identifier
    unless self.unique_identifier
      url_is_available = false
      unique_identifier = ''
      while !url_is_available
        number_of_characters = Random.rand(6..10)
        unique_identifier = (0..number_of_characters).map { ([*65..122] - [92, 94, 96]).sample.chr }.join

        possible_link = Link.find_by(unique_identifier: unique_identifier)
        url_is_available = possible_link.blank?
      end
      self.unique_identifier = unique_identifier
    end
  end
end