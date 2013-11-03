Rails.logger = Logger.new(STDOUT)
Rails.logger = Log4r::Logger.new("Application Log")

# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Seedb::Application.initialize!
