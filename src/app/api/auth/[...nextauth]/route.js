import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import {connectDB} from "../../../../utils/mongoose"
import User from "../../../../models/user"
import bcryptjs from "bcryptjs"


const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:'crendentials',
            credentials:{
                email:{label:"Email",type:"email",placeholder:"jsmith"},
                password:{label:"Password",type:"password",placeholder:"*******"},
            },
            async authorize(credentials,req){
                await connectDB()
                console.log( credentials);
                const userFound = await User.findOne({email: credentials.email}).select("+password")
                if(!userFound) throw new Error("invalid credential");
                const passwordMatch = await bcryptjs.compare(credentials.password, userFound.password)
                if(!passwordMatch) throw new Error("invalid credential");
                console.log(userFound);
                return userFound
            }
        })
    ],
    callbacks:{
        jwt({account,token,user,profile,session}){
            if (user) token.user = user;
            return token
        },
        session({session,token}){
            session.user = token.user
            return session;
        }
    },
    pages:{
        signIn:'/'
    }
})

export { handler as GET, handler as POST}