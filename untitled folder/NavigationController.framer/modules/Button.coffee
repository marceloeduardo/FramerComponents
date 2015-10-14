class exports.Button extends Layer
	constructor: (options={}) ->

		@type = options.type || "single"
		@baseColor = "#666"
		@hoverColor = "#333"
		@clickColor = "#666"
		@clickColor = "#222"
		@default_height = 40
		@default_width = 60
		@textSize = "16px"

		# maybe it could be a default function -> print "Action not defined"

		@action = options.action || -> print "This was Clicked"
		@label = options.label || "button"
		#defaults
		options.x = options.x || x / 2
		options.y = options.y || y / 2
		options.width = options.width || @default_width
		options.height = options.height || @default_height 
		options.backgroundColor = options.backgroundColor || @baseColor
		options.superLayer = options.superLayer || ""

		super options
		#should use a switch
		window.Utils.labelLayer(@, @label)

		if @type is "left"
			@style =
				"border":"2px solid white"
				"border-top-left-radius":"20px"
				"border-bottom-left-radius":"20px"
				"fontSize":@textSize

		else if @type is "right"
			@style = 
				"border":"2px solid white"
				"border-top-right-radius":"20px"
				"border-bottom-right-radius":"20px"
				"fontSize":@textSize
				
		else if @type is "middle"
			@style = 
				"border":"2px solid white"
				"fontSize":@textSize
				
		else if @type is "single"
			@style = 
				"border":"2px solid white"
				"border-top-left-radius":"20px"
				"border-bottom-left-radius":"20px"
				"border-top-right-radius":"20px"
				"border-bottom-right-radius":"20px"
				"fontSize":@textSize
		
		

		#events

		@on Events.MouseOver, ->
			@style =
				backgroundColor:@hoverColor
				"border-color":"1px solid #ccc"


		@.on Events.Click, ->
			#simple bounce			
			#call action for click

			@action()


		@.on Events.MouseOut, ->
			@style =
				backgroundColor:@baseColor

		#simple "reduce it" effect
		@.on Events.TouchStart, ->
			@scale = 0.95
			@style =
				backgroundColor:@clickColor

		@.on Events.TouchEnd, ->
			@scale = 1
			@style =
				backgroundColor:@baseColor
		#if states are used:

		@states.add
			hover:{}
			normal:{}
			pressed:{}