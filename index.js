import got from 'got';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

// Get the stream name from the event
var streamName = 'streamname';
var streamerId = '123456789';
var authToken = '123456789_longtoken_verylong';

console.log('whats happening');;;
// Request https://streamelements.com/${streamName}/commands with puppeteer then get the body html
const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
});
const page = await browser.newPage();
await page.goto(`https://streamelements.com/${streamName}/commands`, {
  waitUntil: "networkidle0",
});
const html = await page.content();
await browser.close();

// Load the html into cheerio
const $ = cheerio.load(html);

// Get the commands
var commands = [];

// Loop through each command
// Get .md-row within tbody
$("tbody")
    .find(".md-row")
    .each(function (i, elem) {
        // Get the command name
        var commandName = $(this).find(".md-cell").first().text();

        // Get the command message in .command-message
        var commandMessage = $(this).find(".command-message").text();

        // Get command cost
        var commandCost = $(this).find(".md-cell").last().text();

        // Add the command to the commands array
        commands.push({
            name: commandName,
            message: commandMessage,
            cost: commandCost,
        });
    });

// For each command create a new command
for (var i = 0; i < commands.length; i++) {
    // Get the command
    var command = commands[i];

    try {
      // Create new command by posting to https://api.streamelements.com/kappa/v2/bot/commands/${streamerId}
      // Add authorization: Bearer ${authToken} to header
      let commandPost = await got.post(
          `https://api.streamelements.com/kappa/v2/bot/commands/${streamerId}`,
          {
              headers: {
                  Authorization:
                      `Bearer ${authToken}`,
              },
              json: {
                  _id: "",
                  accessLevel: 100,
                  aliases: [],
                  channel: "",
                  command: `${command.name.replace("!", "")}`,
                  cooldown: {
                      global: 5,
                      user: 15,
                  },
                  cost: `${parseInt(command.cost)}`,
                  enabled: true,
                  enabledOffline: true,
                  enabledOnline: true,
                  hidden: false,
                  keywords: [],
                  regex: "",
                  reply: `${command.message}`,
                  type: "say",
                  updatedAt: "",
                  new: {
                      type: "new",
                      template: "",
                  },
              },
              responseType: "json",
          }
      );

      console.log('success');
    } catch (error) {
        console.log(error);
    }
}
console.log('done');
