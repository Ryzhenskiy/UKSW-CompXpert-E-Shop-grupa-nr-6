import { User } from '@/app/models/User';
import { UserInfo } from '@/app/models/UserInfo';
import { Log } from '@/app/models/Log';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../libs/mongoConnect';

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',

      credentials: {
        username: {
          label: 'email',
          type: 'text',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          await Log.create({
            email: user.email,
            action: 'Login',
            provider: 'Credentials',
            timestamp: new Date(),
          });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await mongoose.connect(process.env.MONGO_URL);

        await Log.create({
          email: user.email,
          action: 'Login',
          provider: account?.provider,
          timestamp: new Date(),
        });
        return true;
      } catch (error) {
        console.error('Error logging user activity:', error);
        return false;
      }
    },
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin === true;
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
