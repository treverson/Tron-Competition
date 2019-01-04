import TronWeb from 'TronWeb'

//轉成promise -> resolve
// window.onload = function() {
// 	console.log('window.onload');
//   if (!window.tronWeb) {
//     const HttpProvider = TronWeb.providers.HttpProvider;
//     const ServerNode = 'https://api.shasta.trongrid.io';
//     const fullNode = new HttpProvider(ServerNode);
//     const solidityNode = new HttpProvider(ServerNode);
//     const eventServer = ServerNode;
    
//     const tronWeb = new TronWeb(
//         fullNode,
//         solidityNode,
//         eventServer,
//     );

//     window.tronWeb = tronWeb;
//   }
// };

// //----------------test------------------


async function componentDidMount() {
	let checkTronLinkState = await new Promise(resolve => {
		const tronWebState = {
			//installed: !!window.tronWeb,
			loggedIn: window.tronWeb && window.tronWeb.ready
		}

		if(tronWebState.loggedIn) {
			// this.setState({
			// 	tronWeb: tronWebState
			// });
			console.log('tronWebState = ' + JSON.stringify(tronWebState));

			return resolve(true);
		}
	});
	console.log("checkTronLinkState: " + typeof(checkTronLinkState));
	// checkTronLinkState.then(string => {
	// 	console.log("checkTronLinkState" + string);
	// });
}
componentDidMount();
//----------------test------------------

// const HttpProvider = TronWeb.providers.HttpProvider; // Optional provider, can just use a url for the nodes instead

// const fullNode = new HttpProvider('https://api.shasta.trongrid.io'); // Full node http endpoint
    
// const solidityNode = new HttpProvider('https://api.shasta.trongrid.io'); // Solidity node http endpoint
    
// const eventServer = 'https://api.shasta.trongrid.io/'; // Contract events http endpoint
// const privateKey = 'c378d74b4b59538674759bebfb31b69f26f7e10413184c605f4a52f037babbdf';

// const tronWeb = new TronWeb(
//   fullNode,
//   solidityNode,
//   eventServer
// );

//get addresss balance
// const userAddress = 'TJWAfHdXd3TUvD6VDNmsoBYvgcxhaqgXP2';
// tronWeb.trx.getBalance(userAddress).then(userBalance => {
//     console.log(`User's balance is: ${ userBalance }`);
// }).catch(error => {
//     console.error(error);  
// });

//create trx10 token
const DEFAULT_TOKEN_OPTIONS = {
	"name" : "TestToken",
	"abbreviation" : "TT",
	"description" : "No description",
	"url" : "google.com",
	"totalSupply" : 111,
	"trxRatio" : 20, // How much TRX will tokenRatio cost?
	"tokenRatio" : 1, // How many tokens will trxRatio afford?
	"saleStart" : 1547511276964,
	"saleEnd" : 1548511276964,
	"freeBandwidth" : 5, // The creator's "donated" bandwidth for use by token holders
	"freeBandwidthLimit" : 50, // Out of totalFreeBandwidth, the amount each token holder get
	"frozenAmount" : 10,
	"frozenDuration" : 10
	// name = false,
	// abbreviation = false,
	// description = false,
	// url = false,
	// totalSupply = 111,
	// trxRatio = 20, // How much TRX will tokenRatio cost?
	// tokenRatio = 1, // How many tokens will trxRatio afford?
	// saleStart = Date.now(),
	// saleEnd = false,
	// freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
	// freeBandwidthLimit = 0, // Out of totalFreeBandwidth, the amount each token holder get
	// frozenAmount = 0,
	// frozenDuration = 0
};

function submit() {
	let tokenOptions = getTokenOptions();
	console.log("submit form data : " + JSON.stringify(tokenOptions));
}
document.getElementById("btn_submit").addEventListener("click", submit);

function getTokenOptions() {
	return {
		"name" : document.getElementById('token_name').value,
		"abbreviation" : document.getElementById('token_abbr').value,
		"description" : document.getElementById('token_description').value,
		"url" : document.getElementById('token_url').value,
		"totalSupply" : document.getElementById('token_totalSupply').value,
		"trxRatio" : document.getElementById('token_trxRatio').value, // How much TRX will tokenRatio cost?
		"tokenRatio" : document.getElementById('token_tokenRatio').value, // How many tokens will trxRatio afford?
		"saleStart" : document.getElementById('token_saleStart').value,
		"saleEnd" : document.getElementById('token_saleEnd').value,
		"freeBandwidth" : document.getElementById('token_freeBandwidth').value, // The creator's "donated" bandwidth for use by token holders
		"freeBandwidthLimit" : document.getElementById('token_freeBandwidthLimit').value, // Out of totalFreeBandwidth, the amount each token holder get
		"frozenAmount" : document.getElementById('token_frozenAmount').value,
		"frozenDuration" : document.getElementById('token_frozenDuration').value
	}
}

window.setTimeout(() => {
	console.log("after 5 seconds...");
	console.log("window.tronWeb : " + window.tronWeb);
	console.log("window.tronWeb.ready : " + window.tronWeb.ready);
	console.log("loggedIn : " + (window.tronWeb && window.tronWeb.ready)); 
	//console.log("tronLinkState : " + JSON.stringify(tronLinkState.componentDidMount()));


	tronWeb.trx.getAccount().then(() => {
		console.log("After getAccount.then...");
		console.log("getAccount = " + JSON.stringify(tronWeb.trx.getAccount()));
		console.log("defaultAddress = " + JSON.stringify(tronWeb.defaultAddress));



		//tronWeb.transactionBuilder.createToken(options = TOKEN_OPTIONS, issuerAddress = this.tronWeb.defaultAddress.hex);
		tronWeb.transactionBuilder.createToken(TOKEN_OPTIONS, tronWeb.defaultAddress.hex).then(transaction => {
			console.log(transaction);
			tronWeb.trx.sign(transaction).then(signedTrx => {
				console.log(signedTrx);
				tronWeb.trx.sendRawTransaction(signedTrx);
			});
		}).catch(error => {
			console.log(error);
		});

	}).catch(error => {
		console.log(`error = ${error}`);
	});

},0);



