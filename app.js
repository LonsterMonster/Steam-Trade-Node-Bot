const config = require('.//settings/config.json')
if (config.IssueTracking == "Enable"){
var Raven = require('raven');
Raven.config('https://0a6d1f872b464102ad9b86e4d12113b7:37f5be982d9e476c9e681ced933031c0@sentry.io/207208').install();
} else {
    console.log ("\x1b[33m WARNING\x1b[37m: IssueTracking Disabled please enable issue tracking to get help faster when you are having problems.")
}
//NPM Modules
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const Steam = require('steam');
const math = require('mathjs');
const mysql = require('mysql');
const fs = require('fs');
const version = require('.//version/version.json')

//Different Files Called Below
const adminConfig = require('.//AdminOptions/Config.json')
const CreatorConfig = require('.//CreatorProperties/Config.json');
const Name = require('.//settings/config.json');
const Games = require('.//settings/Games.json');
const messages = require('.//settings/Messages/messages.json');
const Prices = require('.//settings/Prices/Prices.json');
const Comments = require('.//settings/Comments/comments.json');
const KeysBanking = require('.//settings/Prices/prices.json');
const stock = require('.//settings/Prices/prices.json');
const SteamID = TradeOfferManager.SteamID;
const MetalPrices = require('.//settings/Prices/MEtalPrices.json')
const path = stock;

console.log("\x1b[8m SteamTrade Bot")//change
console.log("\x1b[33m Current Version:\x1b[35m" + version.version)
console.log("\x1b[33mCreator:\x1b[35m http://Github.com/Lonster_Monster")
console.log("\x1b[33mIssues with the Bot:\x1b[35m https://github.com/LonsterMonster/Steam-Trade-Node-Bot/issues")
console.log("\x1b[33mIdeas for the Bot:\x1b[35m http://steamcommunity.com/groups/MarketWH/discussions/0/\x1b[0m")
console.log(" ")
console.log(" ")
const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en',
});

const logOnOptions = {
	accountName: config.username,
	password: config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('succesfully logged on.');
    client.setPersona(SteamUser.Steam.EPersonaState.Online,config.SteamName);
    client.gamesPlayed([Games.Game1,Games.Game2]);
});

//Steam Friend Request Accept
client.on('friendRelationship', (steamID, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamID);
        client.chatMessage(steamID, messages.WELCOME);
	    client.chatMessage(steamID, messages.WELCOME2);
    }
})


client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);

	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});

if (fs.readFileSync('.//settings/Prices/prices.json')){
	console.log('Price / Stock file loaded')
}

//Steam Chat Messages
client.on("friendMessage", function(steamID, message) {
	if (message == "hi") {
		client.chatMessage(steamID, messages.hi);
    }
    if (message == "!Help") {
		client.chatMessage(steamID, messages.help);
    }
    if (message == "!Group") {
		processOffer(offer);;
    }
	if (message == "!Mann Co. Supply Crate Key") {
		if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
		 	var Newmessage = message.replace("!","")
			for(i in KeysBanking){
			var customessage = KeysBanking[i].Messages
				client.chatMessage(steamID, customessage.buy);
				client.chatMessage(steamID, customessage.sell);
				client.chatMessage(steamID, customessage.instock);
				client.chatMessage(steamID, customessage.stocklimit);
				}
		} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
		}
	}
	if (message == "!Buy Mann Co. Supply Crate Key") {
		if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
		 	var Newmessage = message.replace("!Buy","")
			for(i in KeysBanking){
			var customessage = KeysBanking[i].Messages
				client.chatMessage(steamID, customessage.buy);
				}
		} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
		}
	}
	if (message == "!Sell Mann Co. Supply Crate Key") {
		if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
		 	var Newmessage = message.replace("!Sell","")
			for(i in KeysBanking){
			var customessage = KeysBanking[i].Messages
				client.chatMessage(steamID, customessage.sell);
				}
		} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
		}
	}
	if (message == "!Stock Mann Co. Supply Crate Key") {
		if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
		 	var Newmessage = message.replace("!Stock","")
			for(i in KeysBanking){
			var customessage = KeysBanking[i].Messages
				client.chatMessage(steamID, customessage.instock);
				client.chatMessage(steamID, customessage.stocklimit);
				}
		} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
		}
	}
});

function acceptOffer(offer) {
	offer.accept((err) => {
		community.checkConfirmations();
		console.log("We Accepted an offer");
		
		if (err) console.log("There was an error accepting the offer.");
	});
	Stockmanager(offer)
}

function declineOffer(offer) {
	offer.decline((err) => {
		console.log("We Declined an offer");
		if (err) console.log("There was an error declining the offer.");
	});
}

function StockManager(offer){
	if (config.Enable_Dev_Stock_Manager== "True"){
		for (var i in ourItems) {
			var item = ourItems[i].market_name;
			if (item == "Mann Co. Supply Crate Key"){
				if (filestock[item]){
				currentstock = filestock[item].instock;
				fs.readFile(filestockname, (err, data) => {
				if (err) throw err;
					console.log('File read');
					});
					console.log('writing to ' + filestockname);
					filestock[item].instock = math.subtract(currentstock, 1);
					fs.writeFile(filestockname, JSON.stringify(filestock, null, 2), function (err) {
					if (err) return console.log(err);
					console.log('writing to ' + filestockname);
					});
				}
			} else {
				if (CurrencyStock[item]){
				currentstock = CurrencyStock[item].instock;
				fs.readFile(CurrencyStockName, (err, data) => {
				if (err) throw err;
					console.log('File read');
					});
					console.log('writing to ' + CurrencyStockName);
					CurrencyStock[item].instock = math.subtract(currentstock, 1);
					fs.writeFile(CurrencyStockName, JSON.stringify(CurrencyStock, null, 2), function (err) {
					if (err) return console.log(err);
					console.log('writing to ' + CurrencyStockName);
					});
				}
			}
		}
		for (var i in theirItems) {
		var item = theirItems[i].market_name;
			if (item == "Mann Co. Supply Crate Key"){
				if (filestock[item]){
					currentstock = filestock[item].instock;
					fs.readFile(filestockname, (err, data) => {
					if (err) throw err;
					console.log('File read');
					});
					console.log('writing to ' + filestockname);
					filestock[item].instock = math.add(currentstock, 1)
					fs.writeFile(filestockname, JSON.stringify(filestock, null, 2), function (err) {
					if (err) return console.log(err);
					});
				}
			} else {
				if (filestock[item]){
					currentstock = filestock[item].instock;
					fs.readFile(filestockname, (err, data) => {
					if (err) throw err;
					console.log('File read');
					});
					console.log('writing to ' + filestockname);
					filestock[item].instock = math.add(currentstock, 1)
					fs.writeFile(filestockname, JSON.stringify(filestock, null, 2), function (err) {
					if (err) return console.log(err);
					});
				}
			}
		}
	}
}

function processOffer(offer) {
	if (offer.isGlitched() || offer.state === 11) {
		console.log("Offer was glitched, declining.");
		declineOffer(offer);
	} else if (offer.partner.getSteamID64() === config.ownerID) {
		acceptOffer(offer);
	} else {
		var ourItems = offer.itemsToGive;
		var theirItems = offer.itemsToReceive;
		var ourValue = 0;
		var theirValue = 0;
		var currentstock = 0;
		var StockLimit = 0;
		const filestockname = require('.//settings/Prices/Prices.json');
		const filestock = require(filestockname);
		const CurrencyStockName - require('.//settings/Prices/MEtalPrices'.json')
		const CurrencyStock = require(CurrencyStockName)
		for (var i in ourItems) {
		var item = ourItems[i].market_name;
			for(var i in KeysBanking[item]){
			var KeysStock = KeysBanking[i].Stock
			currentstock = KeysStock.instock;
			StockLimit = KeysStock.stocklimit;
			console.log(timestamp+"Our " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
				var KeysPrice = KeysBanking[i].Prices
					if(KeysPrice[item]) {
					ourValue += KeysPrice.sell;
					} else {
						ourValue += 99999;
						console.log("Our" + item + "was not in Prices File")
					}
				} else if (currentstock >= StockLimit){
					console.log(timestamp+item +" Stock Limit Reached")
					manager.on('receivedOfferChanged', (offer)=>{
						if (adminConfig.disableAdminComments == "Enable") {
							community.postUserComment(offer.partner.toString(), item+ " - Stock Limit Reached", (err)=>{
							if(err) throw err.message
							});
						}
					})
				} else {
					console.log(timestamp+"Invalid Value.");
					ourValue += 99999;
				}
			} else for(var i in CurrencyStock[item]){
				currentstock = CurrencyStock.instock;
				StockLimit = CurrencyStock.stocklimit;
				console.log(timestamp+"Our " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
					if (item = CurrencyStock[item]){
						
					} else {
						ourValue += 99999;
						console.log("Our" + item + "was not in Prices File")
					}
						ourValue += CurrencyStock.sell;
				} else if (currentstock >= StockLimit){
					console.log(timestamp+item +" Stock Limit Reached")
					manager.on('receivedOfferChanged', (offer)=>{
					if (adminConfig.disableAdminComments == "Enable") {
						community.postUserComment(offer.partner.toString(), item+ " - Stock Limit Reached", (err)=>{
							if(err) throw err.message
						});
					}
					})
				} else {
					console.log(timestamp+"Invalid Value.");
					ourValue += 99999;
				}
			}
		}			
		for(var i in theirItems) {
			var item = theirItems[i].market_name;
			for(var i in KeysBanking[item]){
			var KeysStock = KeysBanking[i].Stock
			currentstock = KeysStock.instock;
			StockLimit = KeysStock.stocklimit;
			console.log(timestamp+"Our " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
				var KeysPrice = KeysBanking[i].Prices
					if(KeysPrice[item]) {
					ourValue += KeysPrice.sell;
					} else {
						ourValue += 99999;
						console.log("Our" + item + "was not in Prices File")
					}
				} else if (currentstock >= StockLimit){
					console.log(timestamp+item +" Stock Limit Reached")
					manager.on('receivedOfferChanged', (offer)=>{
						if (adminConfig.disableAdminComments == "Enable") {
							community.postUserComment(offer.partner.toString(), item+ " - Stock Limit Reached", (err)=>{
							if(err) throw err.message
							});
						}
					})
				} else {
					console.log(timestamp+"Invalid Value.");
					ourValue += 99999;
				}
			} else for(var i in CurrencyStock[item]){
				currentstock = CurrencyStock.instock;
				StockLimit = CurrencyStock.stocklimit;
				console.log(timestamp+"Our " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
					if (item = CurrencyStock[item]){
						
					} else {
						ourValue += 99999;
						console.log("Our" + item + "was not in Prices File")
					}
						ourValue += CurrencyStock.sell;
				} else if (currentstock >= StockLimit){
					console.log(timestamp+item +" Stock Limit Reached")
					manager.on('receivedOfferChanged', (offer)=>{
					if (adminConfig.disableAdminComments == "Enable") {
						community.postUserComment(offer.partner.toString(), item+ " - Stock Limit Reached", (err)=>{
							if(err) throw err.message
						});
					}
					})
				} else {
					console.log(timestamp+"Invalid Value.");
					ourValue += 99999;
				}
			}	
		}
		console.log("Our value: "+ourValue);
		console.log("Their value: "+theirValue);

		if (ourValue <= theirValue) {
			StockManager(offer)
			acceptOffer(offer);
		} else if (ourValue > theirValue){
			console.log("Their value was different.")
			declineOffer(offer);
		}
	}
}

function Comment (offer){
	if (config.Comments == "Enable") {
		if (adminConfig.disableAdminComments == "Enable") {
			if (offer.partner.toString() === CreatorConfig.CreatorID){
			}
		}
	} else {
		community.postUserComment(offer.partner.toString(), math.pickRandom([Comments.comments0, Comments.comments1, Comments.comments2, Comments.comments3, Comments.comments4, Comments.comments5])), (err)=>{
		if(err) throw err.message
		}
	}
}
manager.on('receivedOfferChanged', (offer)=>{
	if(offer.state === 3){
		Comment(offer)
	} else {
console.log('\x1b[33m WARNING\x1b[37m: Cannot comment on user profiles becasue config.Comments is set to false. ');
	}
})
client.setOption("promptSteamGuardCode", false);

manager.on('newOffer', (offer) => {
     processOffer(offer);
});
