module Presenters
  class ApiPresenter
    def self.format(object_to_format)
      if object_to_format.respond_to?(:map)
        object_to_format.map{ |property| format_single_property(property) }
      else
        format_single_property(object_to_format)
      end
    end

    def self.format_single_property(obj)
      case obj.class.name
      when 'User'
        {
          id: obj.id,
          email: obj.email
        }
      when 'Link'
        {
          id: obj.id,
          original_url: obj.original_url,
          unique_identifier: obj.unique_identifier
        }
      else
        raise 'No presenter for this object'
      end
    end
  end
end