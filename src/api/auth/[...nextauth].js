import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PIUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PIUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "read:user user:email",
                },
            },
        }),
    ]
});