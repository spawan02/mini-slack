import SlackPage from '@/components/SlackPage'
// const getMessages = async () => {
//     const session = await getServerSession(authOptions)
//     try {

//         const message = await prisma.message.findMany({
//             where: {
//                 userId: Number(session.user?.id)
//             },
//             orderBy: {
//                 timeStamp: "desc"
//             }
//         })
//         return message.map((m) => ({
//             content: m.content,
//             reactions: m.reactions,
//             userId: m.userId,
//             timeStamp: m.timeStamp,
//             id: m.id
//         }))
//     } catch (e) {
//         throw e;
//     }
// }

const page = async () => {
    // const message = await getMessages()

    return (
        <SlackPage />

    )
}

export default page