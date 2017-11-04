const config = require('.//settings/config.json')
if (config.IssueTracking == "Enable"){
var Raven = require('raven');
Raven.config('https://0a6d1f872b464102ad9b86e4d12113b7:37f5be982d9e476c9e681ced933031c0@sentry.io/207208').install();
} else {
    console.log ("\x1b[33m WARNING\x1b[37m: IssueTracking Disabled please enable issue tracking to get help faster when you are having problems.")
}
if (config.DevCode == "True"){
	console.log('\x1b[33m WARNING\x1b[37m: DEVEOPER OPTIONS ENABLED, DEVELOPER OPTIONS IS FOR EXPIRAMENTAL USE ONLY AND SHOULD BE FOR DEVELOPERS ONLY')
}

const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const math = require('mathjs');
const fs = require('fs');
const colors = require('colors');
const jsonfile = require('jsonfile');

const adminConfig = require('.//AdminOptions/Config.json')
const CreatorConfig = require('.//CreatorProperties/Config.json');
const Name = require('.//settings/config.json');
const Games = require('.//settings/Games.json');
const messages = require('.//settings/Messages/messages.json');
const Prices = require('.//settings/Prices/Prices.json');
const Comments = require('.//settings/Comments/comments.json');
const HatsBanking = require('.//settings/Messages/Hatsmessage.json');
const KeysBanking = require('.//settings/Messages/Keysmessage.json');
const Robopartbanking = require('.//settings/Messages/Keysmessage.json');
const stock = require('.//settings/Stock/stock.json');
const MetalPrices = require('.//settings/Prices/MEtalPrices.json');


const path = stock;
const timestampcolor1 = config.Timestampcolor1
const timestampcolor2 = config.Timestampnumber
const timestampcolor3 = config.Timestampcolor2

const SteamID = TradeOfferManager.SteamID;
const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en',
});
	var date = new Date();
	var minute = date.getMinutes()
	var second = date.getSeconds()
	var hour = date.getHours()
	var h = hour
	var m = minute
	var s = second
	var timestamp = "[".green+colors.yellow(h)+":".cyan+colors.yellow(m)+":".cyan+colors.yellow(s)+"]".green
	
console.log("\x1b[8m SteamTrade Bot")
console.log("\x1b[33m Current Version:\x1b[35m 2.5.0")
console.log("\x1b[33mCreator:\x1b[35m http://Github.com/Lonster_Monster")
console.log("\x1b[33mIssues with the Bot:\x1b[35m https://github.com/LonsterMonster/Steam-Trade-Node-Bot/issues")
console.log("\x1b[33mIdeas for the Bot:\x1b[35m http://steamcommunity.com/groups/MarketWH/discussions/0/\x1b[0m")
console.log(" ")
console.log(" ")

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



client.on('friendRelationship', (steamID, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamID);
        client.chatMessage(steamID, messages.WELCOME);
	    client.chatMessage(steamID, messages.WELCOME2);
    }
});


client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);

	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});

if (config.Hatbanking == "Enable"){
    console.log('Craft Hat Banking Enabled')
} else {
    console.log('\x1b[33m WARNING\x1b[37m: Craft Hat Banking not Enabled')
}
if (config.KeyBanking == "Enable"){
    console.log('Key Banking Banking Enabled')
} else {
    console.log('\x1b[33m WARNING\x1b[37m: Key Banking is not Enabled')
}

messages
client.on("friendMessage", function(steamID, message) {
	if (message == "hi") {
		client.chatMessage(steamID, messages.hi);
        }
    	if (message == "!Help") {
		client.chatMessage(steamID, messages.help);
        }
    	if (message == "!Group") {
		client.chatMessage(steamID, messages.Group);
        }
if (config.Hatbanking == "Enable"){
    	if (message == "!The Tartan Spartan") {
		client.chatMessage(steamID, HatsBanking.Tartan);
	    }
    	if (message == "!The Virtual Reality Headset") {
		client.chatMessage(steamID, HatsBanking.Virtual);
        }
    	if (message == "!Tam O' Shanter") {
		client.chatMessage(steamID, HatsBanking.Tam);
        }
    	if (message == "!Large Luchadore") {
		client.chatMessage(steamID, HatsBanking.Lucha);
        }
        if (message == "!The Mark of the Saint") {
		client.chatMessage(steamID, HatsBanking.Saint);
        }
    	if (message == "!Big Country") {
		client.chatMessage(steamID, HatsBanking.Country);
        }KeysBanking
    	if (message == "!Larrikin Robin") {
		client.chatMessage(steamID, HatsBanking.Robin);
        }
    	if (message == "!The U-clank-a") {
		client.chatMessage(steamID, HatsBanking.uclanka);
        }
        if (message == "!Backbiter's Billycock"){
        client.chatMessage(steamID, HatsBanking.Billy);
   	    }
} else{
	client.chatMessage(steamID, "I am sorry i am currently not programmed to Buy or sell Craft Hats");
    }

 if (config.KeyBanking == "True" || "true" || "Enable" || "enable"){
        if (message == "!Mann Co. Supply Crate Key") {
		client.chatMessage(steamID, KeysBanking.Crate);
        }
    if (message == "!Robo Community Crate Key") {
		client.chatMessage(steamID, KeysBanking.Robo);
        }
    if (message == "!Summer Appetizer Key") {
		client.chatMessage(steamID, KeysBanking.Appetizer);
        }
	if (message == "!Red Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Red);
        }
    if (message == "!Orange Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Orange);
        }
    if (message == "!Yellow Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Yellow);
        }
    if (message == "!Green Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Green);
        }
	if (message == "!Aqua Summer 2013 Cooler Key") {
		client.chatMessage(steamID, KeysBanking.Aqua);
        }
    if (message == "!Blue Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Blue);
   	    }
	if (message == "!Brown Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Brown);
   	    }
	if (message == "!Black Summer 2013 Cooler Key"){
        client.chatMessage(steamID, KeysBanking.Black);
   	    }
    if (message == "!Fall 2013 Acorns Crate Key"){
        client.chatMessage(steamID, KeysBanking.Acorns);
   	    }
	if (message == "!Fall 2013 Gourd Crate Key"){
        client.chatMessage(steamID, KeysBanking.Gourd);
   	    }
	if (message == "!Mann Co. Strongbox Key"){
        client.chatMessage(steamID, KeysBanking.Strongbox);
   	    }
	if (message == "!Mann Co. Stockpile Crate Key"){
        client.chatMessage(steamID, KeysBanking.Stockpile);
   	    }
	if (message == "!End of the Line Key"){
        client.chatMessage(steamID, KeysBanking.EOTL);
   	    }
	if (message == "!Gun Mettle Key"){
        client.chatMessage(steamID, KeysBanking.Mettle);
   	    }
	if (message == "!Gun Mettle Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.MettleCosmetic);
   	    }
	if (message == "!Invasion Community Update Key"){
        client.chatMessage(steamID, KeysBanking.Invasion);
   	    }
	if (message == "!Gargoyle Key"){
        client.chatMessage(steamID, KeysBanking.Gargoyle);
   	    }
	if (message == "!Tough Break Key"){
        client.chatMessage(steamID, KeysBanking.Break);
   	    }
	if (message == "!Tough Break Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.BreakCosmetic);
   	    }
	if (message == "!Mayflower Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.Mayflower);
   	    }
	if (message == "!Creepy Crawly Key"){
        client.chatMessage(steamID, KeysBanking.Creepy);
   	    }
	if (message == "!Rainy Day Cosmetic Key"){
        client.chatMessage(steamID, KeysBanking.Rainy);
   	    }

} else {
        client.chatMessage(steamID, "I am sorry i am currently not able to Buy or sell Keys");
};
if (config.Robopartbanking == "True" || "true" || "Enable" || "enable"){
			 if (message == "!Battle-Worn Robot Money Furnace") {
	 client.chatMessage(steamID, KeysBanking.furnace);
			 }
			 if (message == "!Reinforced Robot Humor Suppression Pump") {
	 client.chatMessage(steamID, KeysBanking.Humor);
			 }
			 if (message == "!Reinforced Robot Emotion Detector") {
	 client.chatMessage(steamID, KeysBanking.Emotion);
			 }
			 if (message == "!Reinforced Robot Bomb Stabilizer") {
	 client.chatMessage(steamID, KeysBanking.bomb);
			 }
			 if (message == "!Battle-Worn Robot Taunt Processor") {
	 client.chatMessage(steamID, KeysBanking.Taunt);
			 }
			 if (message == "!Battle-Worn Robot KB-808") {
	 client.chatMessage(steamID, KeysBanking.kb808);
			 }
			 if (message == "!Pristine Robot Currency Digester") {
	 client.chatMessage(steamID, KeysBanking.currency);
			 }
			 if (message == "!Pristine Robot Brainstorm Bulb") {
	 client.chatMessage(steamID, KeysBanking.Bulb);
			 }
		};
});


function acceptOffer(offer) {
	offer.accept((err) => {
		community.checkConfirmations();
		console.log(timestamp+"We Accepted an offer");
		if (err) console.log(timestamp+"There was an error accepting the offer.");
	});

}

function declineOffer(offer) {
		console.log(timestamp+"We Declined an offer");
	offer.decline((err) => {
		if (err) console.log(timestamp+"There was an error declining the offer.");
	});
}

function processOffer(offer) {
	if (offer.isGlitched() || offer.state === 11) {
		console.log(timestap+"Offer was glitched, declining.");
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
		const filestockname = './/settings/Stock/stock.json';
		const filestock = require(filestockname);
		for (var i in ourItems) {
			var item = ourItems[i].market_name;
			if (stock[item]){
				currentstock = stock[item].instock;
				StockLimit = stock[item].stocklimit;
				if (fs.readFileSync('.//settings/Stock/stock.json')){
				console.log(timestamp+"Our " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
					if(Prices[item]) {
					ourValue += Prices[item].sell;
					} else if (MetalPrices[item]){
					ourValue += MetalPrices[item].sell;
				} else {
					console.log(timestamp+"Invalid Value.");
					ourValue += 99999;
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
				}
				};
			}
		}					
		for(var i in theirItems) {
			var item= theirItems[i].market_name;
			if (stock[item]){
				currentstock = stock[item].instock;
				StockLimit = stock[item].stocklimit;
				fs.readFileSync('.//settings/Stock/stock.json')
				console.log(timestamp+"Thier " +item+" - stock number: " +currentstock+ " / " +StockLimit+ ".")
				if (currentstock < StockLimit){
					if(Prices[item]) {
					theirValue += Prices[item].buy;
					} else if (MetalPrices[item]){
					theirValue += MetalPrices[item].buy;
					} else {
					console.log("Item Not in Prices.json")
					}
				} else if (currentstock >= StockLimit){
						console.log(timestamp+item +" Stock Limit Reached")
						manager.on('receivedOfferChanged', (offer)=>{
						community.postUserComment(offer.partner.toString(), item+ " Stock Limit Reached", (err)=>{
							if(err) throw err.message
							})
						})
					} 
			}
		}
console.log(timestamp+"Our value: "+ourValue);
console.log(timestamp+"Their value: "+theirValue);

		if (ourValue <= theirValue) {
			if (config.Enable_Dev_Stock_Manager== "True"){
				for (var i in ourItems) {
					var item = ourItems[i].market_name;
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
				}
				for (var i in theirItems) {
					var item = theirItems[i].market_name;
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
		acceptOffer(offer);
		} else if (ourValue > theirValue){
		console.log(timestamp+"Their value was different.")
			declineOffer(offer);
		}
	}
}
manager.on('receivedOfferChanged', (offer)=>{
	if (offer.state === 7){
		if (community.postUserComment(offer.partner.toString())) {
			if (community.postUserComment(offer.partner.toString(),"Your trade value was different"), (err)=>{
				if(err) throw err.message
			}){
				console.log("Commented on "+offer.partner.toString()+"'s Profile")
			}
		}
	}
	if(offer.state === 3){
		if (config.Comments == "Enable") {
			if (adminConfig.disableAdminComments == "Enable") {
				if (offer.partner.toString() === CreatorConfig.CreatorID){
				}
			} else {
				if (community.postUserComment(offer.partner.toString())) {
					if (community.postUserComment(offer.partner.toString(), math.pickRandom([Comments.comments0, Comments.comments1, Comments.comments2, Comments.comments3, Comments.comments4, Comments.comments5])), (err)=>{
						if(err) throw err.message
						}){
							console.log(timestamp+"Commented on "+offer.partner.toString()+"'s Profile")
						}
					}
				};
		} else {
console.log('\x1b[33m WARNING\x1b[37m: Cannot comment on user profiles becasue config.Comments is set to false. ');
		}
	}
})
client.setOption("promptSteamGuardCode", false);

manager.on('newOffer', (offer) => {
     processOffer(offer);
});
