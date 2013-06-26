var settingsRepo = require("../model/settings"),
	config = require("../config"),
	azure = require('azure');

process.env.AZURE_SERVICEBUS_NAMESPACE = config.azureNamespace;
process.env.AZURE_SERVICEBUS_ACCESS_KEY = config.azureAccessKey;

var serviceBusService = azure.createServiceBusService();

module.exports = {

	sendConfigMessage: function(msg) {
		serviceBusService.sendTopicMessage(config.configTopic, {
			body: "Config Message",
			customProperties: {
				type: msg
			}
		}, function(error) {
			if (error) {
				console.log(error);
			} else {
				console.log("Message Sent: " + msg);
			}
		});
	},

	sendRemoveMessage: function(type, id) {
		var msg = {
			id: id,
			type: type,
			content: "",
			size: 0,

		};

		serviceBusService.sendTopicMessage(config.messageTopic, {
			body: "Message From " + type,
			customProperties: msg
		}, function(error) {
			if (error) {
				console.log(error);
			} else {
				console.log("Remove Message Sent: " + msg.id);
			}
		});
	},

	sendNewMessage: function(title, msg) {
		serviceBusService.sendTopicMessage(config.messageTopic, 
		      { body: title, customProperties: msg }, function(error) {
		          if (error) {
		            console.log(error);
		          }
		          else {
		            console.log("promoted Message Sent: " + msg.content);
		          }
		        });
	}
}