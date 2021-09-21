

const Client = require('./lib/Client')

function Aether(token, options) {
    return new Client(token, options);
}

Aether.Base = require('./lib/Structures/Base')
Aether.Bucket = require('./lib/util/Bucket') 
Aether.Call = require("./lib/structures/Call");
Aether.CategoryChannel = require("./lib/structures/CategoryChannel");
Aether.Channel = require("./lib/structures/Channel");
Aether.Client = Client;
Aether.Collection = require('./lib/util/Collection')
Aether.Command = require("./lib/command/Command");
Aether.CommandClient = require("./lib/command/CommandClient");
Aether.Constants = require('./lib/Constants')
Aether.DiscordHTTPError = require("./lib/errors/DiscordHTTPError");
Aether.DiscordRESTError = require("./lib/errors/DiscordRESTError");
Aether.ExtendedUser = require("./lib/structures/ExtendedUser");
Aether.GroupChannel =  require("./lib/structures/GroupChannel");
Aether.Guild = require("./lib/structures/Guild");
Aether.GuildChannel = require("./lib/structures/GuildChannel");
Aether.GuildIntegration = require("./lib/structures/GuildIntegration");
Aether.GuildPreview = require("./lib/structures/GuildPreview");
Aether.GuildTemplate = require("./lib/structures/GuildTemplate");
Aether.Invite = require("./lib/structures/Invite");
Aether.Member = require("./lib/structures/Member");
Aether.Message = require("./lib/structures/Message");
Aether.NewsChannel = require("./lib/structures/NewsChannel");
Aether.Permission = require("./lib/structures/Permission");
Aether.PermissionOverwrite = require("./lib/structures/PermissionOverwrite");
Aether.PrivateChannel = require("./lib/structures/PrivateChannel");
Aether.Relationship = require("./lib/structures/Relationship");
Aether.RequestHandler = require("./lib/rest/RequestHandler");
Aether.Role = require("./lib/structures/Role");
Aether.SequentialBucket = require("./lib/util/SequentialBucket");
Aether.Shard = require("./lib/gateway/Shard");
Aether.SharedStream = require("./lib/voice/SharedStream");
Aether.StoreChannel = require("./lib/structures/StoreChannel");
Aether.TextChannel = require("./lib/structures/TextChannel");
Aether.UnavailableGuild = require("./lib/structures/UnavailableGuild");
Aether.User = require("./lib/structures/User");
Aether.VERSION = require("./package.json").version;
Aether.VoiceChannel = require("./lib/structures/VoiceChannel");
Aether.VoiceConnection = require("./lib/voice/VoiceConnection");
Aether.VoiceConnectionManager = require("./lib/voice/VoiceConnectionManager");
Aether.VoiceState = require("./lib/structures/VoiceState");

module.exports = Aether;