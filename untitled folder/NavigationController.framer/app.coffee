ScreenComponent = require("Screen").ScreenComponent
C = require("Controller").Controller
popmotion = require("Controller").popmotion
Button = require("Button").Button
#print popmotion.Actor

# test ui	
#test easing
material = new popmotion.Easing(0.4, 0.0, 0.2, 1);	
button = new Button
	y:1200, x:50, width:100, height:100, backgroundColor:"gray", label:"Stack", type:"left"		
buttonAdd = new Button
	y:1200, x:(button.maxX-2), width:140, height:100, backgroundColor:"gray",label:"add", type:"middle"

buttonShow = new Button
	y:1200, x:(buttonAdd.maxX-2), width:140, height:100, backgroundColor:"gray",label:"show",type:"middle"

buttonChange = new Button
	y:1200, x:(buttonShow.maxX-2), width:140, height:100, label:"Change",type:"middle"
	
buttonHide = new Button
	y:1200, x:(buttonChange.maxX-2), width:140, height:100, backgroundColor:"gray",label:"hide",type:"right"

buttonChange.on Events.Click, ->
	bgActor = new popmotion.Actor
		element: C.screens["home"]._element
		values:
			backgroundColor:Utils.randomColor()
	bgTween = new popmotion.Tween
		values:
			backgroundColor:Utils.randomColor()
		duration:3000
		curve:material
	bgActor.start(bgTween)
	
###

	
button.actor = new (popmotion.Actor)(
  element: button._element
  values:
    backgroundColor: '#000000'
    borderRadius: '50%')

button.foo = new popmotion.Tween 
	values: 
		backgroundColor:'#ff2420'
	duration:5000
button.actor.start(button.foo)
###

button.on Events.Click, ->
	C.printStack()

testScreens = ["home","intern","detail","modal","share","dialog"]
testStep = 0
showStep = 0

buttonAdd. on Events.Click, ->
	screen = new ScreenComponent
		x:50 * testStep
		y:50 * testStep
		width:750
		height:1000
		name:testScreens[testStep]
		visible:false
	testStep++	
	C.add(screen)

buttonShow.on Events.Click, ->
	print "pressed showing"
	if showStep < testStep
		C.show(testScreens[showStep])
		showStep++
	else
		print "no more screens to show"
	
	
buttonHide.on Events.Click, ->
	#C.hide(testScreens[testStep])
	C.back(exit=false)
	testStep--
	showStep--