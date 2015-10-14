exports.popmotion = require("npm").popmotion
exports.Controller = {
	#stack stores the screens that are present in the navigation tree.
	stack : []
	screens : []
	active : -1 
	#disable it for production
	current : "none"
	debug : true
	add: (screen) ->
		print screen.name
		#add the screen to the screen collection
		@screens[screen.name] = screen
	remove: (screenName) ->
		#verify if screen exists
		if not @screens.hasOwnProperty screenName
			print "this screen #{screenName} doesn't exist"
			return
		delete @screens[screenName]
		#remove from stack as well if present
		@stack = _.without @stacks, screenName

	show : (screenName) ->
		#add the screen to the stacl
		#show it
		#if @stack.length is 0
		print "lets show #{screenName} - stack size is #{@stack.length} and we will exit animate "
		#let's check if it is the first screen
		if @stack.length is 0
			@stack.push(@screens[screenName])
			@screens[screenName].enterAnimation()
		else
			print "there's something there. Exit it first"
			#if not the first, exit previous, then animate current
			@stack[@stack.length-1].exitAnimation()
			#add new screen to stack
			@stack.push(@screens[screenName])
			#animate it1
			@screens[screenName].enterAnimation()


		print "and we're gold #{@stack.length}"
		if @active is -1 
			@active = 0
		if @.debug then print "added #{screenName}, stack is now: #{@stack.length} big"
	
	hide : () ->
		if @stack.length > 0
			@stack[@stack.length-1].exitAnimation()
		else
			if @debug then print "end of stack"
			
		if @debug then print "removing SC, current size: #{@stack.length}  "
			
		@stack.pop()
		
		if @debug then print "Done. New current size: #{@stack.length}  "
	
	back : (exit=false) ->
		#check if we're not in the limit already
		print "printing #{@stack.length} exit--->"+exit
		if @stack.length > 1 
			#hide current screen
			@stack[@stack.length-1].exitAnimation()
			#remove from stack
			@stack.pop()
			if @stack.length > 0
				@stack[@stack.length-1].enterAnimation()
		#last screen reached	
		else
			if exit is false
				print "last screen or exit was true? : #{exit}"
			else
				print "close the app"

	printStack : ->
		print "STACK size: #{@stack.length}  | Active is #{@active} | checking name based #{@screens["home"]}"
		for screen in @stack
			print screen.name
}