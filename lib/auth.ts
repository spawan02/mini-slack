import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/prisma/src";
import { userSchemaValidation } from "@/config/validator";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials): Promise<any> {
               
                const userValidation =  userSchemaValidation.safeParse(credentials)
                if(!userValidation.success){
                    console.log('error')
                    throw new Error
                }
                const {email, password} = userValidation.data;
                const hashedPassword = await bcrypt.hash(password,10);
                const existingUser = await prisma.user.findFirst({
                    where:{
                        email: email
                    }
                })
                if (existingUser){
                    const passwordValidation = await bcrypt.compare(password, existingUser.password)
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
                            email: email,
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
    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages:{
        error: '/error',
        signIn: '/signin'
    }
    
}