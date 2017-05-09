module CustomHelpers
  class << self
    def registered(app)
      app.send :include, InstanceMethods
    end
    alias :included :registered
  end

  module InstanceMethods
    def asset_url(path, prefix="")
      if prefix == "video"
        # Do something fancy
      else
        # super (get the results of higher up the stack, may not be necessary)
      end
    end

    def video_path(my_video)
      asset_path :video, my_video
    end

    def video_tag(my_video)
      tag(:video, :src => video_path(my_video))
    end
  end
end