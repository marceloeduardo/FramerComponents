
###
A Screen is a top level layer that can be linked to others screens easily with
a Controller. The combo Screen + Controller is the simplest way to bootstrap your
prototype. A simple collection of Screens will be a nice clickable prototype like invisio. 
Then you can slowly develop each screen, independently and increase the detail of your prototype.

First,  "default" class variables. you should access this with ScreenComponent.VAR 
I added instance variables for each of those class variables, so you can override on instance level
Or class level. If you don't pass any arguments to the creation (new ScreenComponent ) it will
always use the default.

@debug 			= add a label with a name to the screen to make it easier to .. duh debug.
@curve 			= default curve for all animations related to the ScreenComponent
@screenW 		= default size for new Screen Components, based now on the Screen size (device you picked / created)
@screenH 		= Same, but for heigh.


The Screen object creates a first layer ( @ ) that behaves just like a normal layer.
These are the custom fields to make our life easier for now:



###

class exports.ScreenComponent extends Layer

	#disable for production
	@debug = true
	#default curve for screen entering
	@curve = "spring(800,90,10)"
	@screenW = Screen.width
	@screenH = Screen.height
	

	constructor:(options={}) ->
		#instance variables
		@container = "empty"
		@active = false

		options.width = options.width || ScreenComponent.screenW
		options.height = options.height || ScreenComponent.screenH
		options.backgroundColor = options.backgroundColor || Utils.randomColor()
		options.x = options.x || 0 
		options.name = options.name || "noName"
		options.curve = options.curve || ScreenComponent.curve || "spring(900,90,10)"
		super options
		if ScreenComponent.debug then Utils.labelLayer(@, " #{@name} - #{@.id}")
		canvas = new Layer width:ScreenComponent.screenW, height:ScreenComponent.screenH, superLayer:@,backgroundColor:"transparent",name:@.name+"- Canvas"
		if options.scrollable is true
			#print "creating scrollable"
			@container = new ScrollComponent width:ScreenComponent.screenW, height:ScreenComponent.screenH, superLayer:@ ,backgroundColor:"transparent",scrollHorizontal: false
		else
			#print "no scroll"
			@container = new Layer width:ScreenComponent.screenW, height:ScreenComponent.screenH, superLayer:@,backgroundColor:"transparent"
	
	enterAnimation: ->
		@active = true
		@visible = true
		@animate
			properties:
				x:0
				opacity:1
				scale:1
			curve:ScreenComponent.curve
		print "enter"
		
	exitAnimation: ->
		@active = false
		@animate
			properties:
				scale:0.8
				x:@x-400
				opacity:0
			curve:ScreenComponent.curve
		Utils.delay 0.5, ->
			@visible = false
		print "exit"
		
	backAnimation: ->
		@active = false
		@animate
			properties:
				x:ScreenComponent.screenW
				opacity:1
			curve:ScreenComponent.curve
		Utils.delay 0.5, ->
			@visible = false
		print "exit"
		
	start: ->
		print "starting #{@name}"
		@active = true
	pause: ->
		print "pausing #{@name}"		
		@active = false
	reset: ->
		print "reset #{@name}"
	