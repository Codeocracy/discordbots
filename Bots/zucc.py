import discord
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv('ZUCC_TOKEN')

client = discord.Client()


@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if('zucc' in message.content.lower()):
        await message.channel.send(':zucc:')

client.run(TOKEN)
