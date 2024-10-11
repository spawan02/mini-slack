// prisma/seed.ts
import { hash } from 'bcrypt'
import prisma from './src'


async function main() {
  // Create users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password: await hash('password123', 10),
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      password: await hash('password123', 10),
    },
  })

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@example.com' },
    update: {},
    create: {
      email: 'charlie@example.com',
      name: 'Charlie Brown',
      password: await hash('password123', 10),
    },
  })

  // Create channels
  const generalChannel = await prisma.channel.create({
    data: {
      name: 'general',
      creatorId: 1
    },
  })

  const randomChannel = await prisma.channel.create({
    data: {
      name: 'random',
      creatorId: 2
    },
  })

  const techChannel = await prisma.channel.create({
    data: {
      name: 'tech',
      creatorId:3
    },
  })

  // Create messages
  const message1 = await prisma.message.create({
    data: {
      content: 'Hello everyone! Welcome to our new Slack clone!',
      userId: alice.id,
      channelId: generalChannel.id,
    },
  })

  const message2 = await prisma.message.create({
    data: {
      content: 'Thanks Alice! This looks great.',
      userId: bob.id,
      channelId: generalChannel.id,
    },
  })

  const message3 = await prisma.message.create({
    data: {
      content: 'Has anyone seen any good movies lately?',
      userId: charlie.id,
      channelId: randomChannel.id,
    },
  })

  const message4 = await prisma.message.create({
    data: {
      content: 'I watched Inception last night. It was mind-bending!',
      userId: alice.id,
      channelId: randomChannel.id,
    },
  })

  const message5 = await prisma.message.create({
    data: {
      content: 'Hey team, what do you think about the new React 18 features?',
      userId: bob.id,
      channelId: techChannel.id,
    },
  })

  // Create reactions
  await prisma.reaction.create({
    data: {
      emoji: '👍',
      messageId: message3.id,
      count:1,
    },
  })

  await prisma.reaction.create({
    data: {
      emoji: '❤️',
      messageId: message3.id,
      count:1,    },
  })


  await prisma.reaction.create({
    data: {
      emoji: '🚀',
      messageId: message5.id,
      count:1,    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })