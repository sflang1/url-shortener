class LinksController < ApplicationController
  before_action           :load_resource, only: [:shorten]

  def shorten
    redirect_to @link.original_url
  end

  private
  def load_resource
    @link = Link.find_by(unique_identifier: params[:shortened_url])

    head 404 unless @link
  end
end