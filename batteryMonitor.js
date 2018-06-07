// Interaction with GPIO
var Gpio = require('onoff').Gpio

/*
// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

// The contract that we are going to interact with
var contractAddress = '0x7fca200c4761ad631031d449a7a40ef2d76c211d'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]')

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress)

// components connected to the RPi
var greenLed = new Gpio(14, 'out')
var redLed = new Gpio(15, 'out')
var button = new Gpio(18, 'in', 'rising')
*/
//Coulomb Counter Pin Assignments
var VIO = new Gpio(40, 'out')
var INT = new Gpio(38, 'in')
var POL = new Gpio(36, 'in')
var GND = new Gpio(34, 'out')

//Program Variables
var isrflag
var timeInt 
var lastIntTime 
var battery_mAh = 400.0
var battery_percent = 100.0
var mA
var ah_quanta = 0.17067759
var percent_quanta = 1.0/(battery_mAh/1000.0*5859.0/100.0)

while (True){

	INT.watch(function (err, value){

		if(err){
			throw err
		}

		lastIntTime = timeInt	
		timeInt = new Date()
		mA = 614.4/((timeInt-lastIntTime)/1000000.0)

		if (POL.read()){
			if (polarity) mA = mA * -1.0
			battery_mAh += ah_quanta
		    	battery_percent += percent_quanta

		} else {

			battery_mAh -= ah_quanta
			battery_percent -= percent_quanta
		} 

		console.log("mAh: ")
	    	console.log(battery_mAh)
	    	console.log(" soc: ")
	    	console.log(battery_percent)
	    	console.log("% time: ")
	    	console.log((time-lasttime)/1000000.0)
	    	console.log("s mA: ")
	    	console.log(mA)
	})
	
	process.on('SIGINT', function () {
		led.unexport()
		button.unexport()
	  })
}
	
		
     

/*
// display initial state
showStatus()



// watch event on the button
button.watch(function (err, value) {
 if (err) {
 throw err
 }

showStatus()
})



// wait for an event triggered on the Smart Contract
var onValueChanged = contract.OnValueChanged({_from: web3.eth.coinbase});

onValueChanged.watch(function(error, result) {
 if (!error) {
 showStatus()
 }
})



// power the LED according the value of the token
function showStatus() {
 
 // retrieve the value of the token
 var token = contract.getTokens(web3.eth.coinbase)

// display the LED according the value of the token
 if (token > 0) {
 // Green: you have enough token
 redLed.writeSync(0)
 greenLed.writeSync(1)
 } else {
 // Red: not enough token
 greenLed.writeSync(0)
 redLed.writeSync(1)
 }

}



// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})
*/
