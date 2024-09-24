import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/prisma/src";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any) {
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                const existingUser = await prisma.user.findFirst({
                    where:{
                        email: credentials.email
                    }
                })
                if (existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (passwordValidation){
                        return {
                            id: existingUser.id.toString()
                        }
                    }
                    return null
                }
                try {
                    const user = await prisma.user.create({
                        data:{
                            email: credentials.username,
                            name: 'test',
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString()
                    }
                }catch(e){
                    console.error(e)
                }
                return null
            },
        })
    ],
    
}