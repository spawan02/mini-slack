import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import prisma from "@/prisma/src";
import { userSchemaValidation } from "@/config/validator";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials) { 
                
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
                    const passwordValidation = await bcrypt.compare(password, existingUser.password??"")
                    if (passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            email:existingUser.email
                            
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
                    if(user) {
                        return {
                            id: user.id.toString(),
                            email: user.email
                        }
                    }
                }catch(e){
                    console.log(e)
                }
                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
          })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",

    callbacks: {
    
        async session({ session, token, user }: any) {
               session.user.id = token.id
               if(user){
                   session.user.email = user.email
               }

               return session
           
        },
        async signIn({ user,account }:any) {
            if(account.provider=="google"){
                const existingUser = await prisma.user.findUnique({
                    where:{
                        email: user.email
                    }
                })
                if(!existingUser){
                    const createdUser = await prisma.user.create({
                    data:{
                        email: user.email,
                        name: user.name??"",
                        provider: 'GOOGLE'
                    }

                })
                return createdUser
            }
        }
        return true;
        },
    },
    pages:{
        error: '/error',
        
    }
}