const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rpc')
		.setDescription('Play rpc'),
	async execute(interaction) {
		await printAfter();
        await interaction.reply('P!');
        await interaction.reply('C!');
        await interaction.reply('S!');
	},
	function: printAfter()
};

function printAfter(time, message, interaction){
	const myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			interaction.reply(message)
			resolve('foo');
		}, time);
	  });
}