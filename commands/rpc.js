const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rpc')
		.setDescription('Play rpc'),
	async execute(interaction) {
		await printAfter(1000, 'R!', interaction, false);
        await printAfter(1000, 'P!', interaction, true);
		await printAfter(1000, 'C!', interaction, true);
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('0')
					.setLabel('rock')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('1')
					.setLabel('paper')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('2')
					.setLabel('scissor')
					.setStyle('PRIMARY'),
			);
		await printAfter(1000, { content: 'S!', components: [row] }, interaction, true);
		const filter = i => ((i.customId === '1' || i.customId === '0' || i.customId === '2') && i.member == interaction.member);

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			// calc win or loss here (33% for every outcome)
			tempInt = Math.floor(Math.random() * 3)
			if (tempInt == 0) {
				await i.update({ content: 'I logd', components: [] });
			}
			else if (tempInt == 1) {
				await i.update({ content: 'I wind', components: [] });
			}
			else {
				await i.update({ content: 'We must battle again! (run the command again because its a tie i cba to make a while loop)', components: [] });
			}
			return
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}
};

function printAfter(time, message, interaction, replied){
	const myPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (replied == true) {
				interaction.followUp(message)
			}
			else {
				interaction.reply(message)
			}
			resolve('foo');
		}, time);
	  });
	return myPromise
}