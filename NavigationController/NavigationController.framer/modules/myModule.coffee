#core class screen	
class exports.Screen extends Layer
	#default curve for screen entering
	@curve = "spring(800,90,10)"
	container = "empty"
	active = false
	
	constructor:(options={}) ->
		options.width = options.width || screenW
		options.height = options.height || screenH
		options.backgroundColor = options.backgroundColor || Utils.randomColor()
		options.x = options.x || newScreenPosition +  CS.screens.length * 20
		super options
		CS.addScreen(@)
		
		
		canvas = new Layer width:screenW, height:screenH, superLayer:@,backgroundColor:"transparent"
		if options.scrollable is true
			#print "creating scrollable"
			@container = new ScrollComponent width:screenW, height:screenH, superLayer:@ ,backgroundColor:"transparent",scrollHorizontal: false
		else
			#print "no scroll"
			@container = new Layer width:screenW, height:screenH, superLayer:@,backgroundColor:"transparent"
	
	enterAnimation: ->
		@active = true
		@visible = true
		@animate
			properties:
				x:0
				opacity:1
				scale:1
			curve:Screen.curve
		print "enter"
		
	exitAnimation: ->
		@active = false
		@animate
			properties:
				scale:0.8
				x:@x-400
				opacity:0
			curve:Screen.curve
		Utils.delay 0.5, ->
			@visible = false
		print "exit"
		
	backAnimation: ->
		@active = false
		@animate
			properties:
				x:screenW
				opacity:1
			curve:Screen.curve
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
		
	