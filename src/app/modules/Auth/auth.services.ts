/* eslint-disable @typescript-eslint/no-unused-vars */
import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import prisma from '../../../shared/prisma'
import bcrypt from 'bcrypt'

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload

  let isUserExist: any;
  const admin = await prisma.officeUser.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    throw new Error('User does not exist')
  }

  if (admin) {
    isUserExist = admin
  }

  const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordCorrect) {
    throw new Error('Password is incorrect');
  }
  
  const payloadData = {
    name: isUserExist!.name,
    email: isUserExist!.email,
    role: isUserExist!.role
  }

  //   create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )
  return { accessToken }
}

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required')
  }

  const decodedToken = jwtHelpers.decodeToken(token)
  const { email, role, name } = decodedToken
  if (!email || !role || !name) {
    throw new Error('Invalid token')
  }

  const admin = await prisma.officeUser.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    throw new Error('User does not exist')
  }
  const payloadData = {
    email: email,
    role: role,
    name: name,
  }
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )
  return {
    accessToken: newAccessToken,
  }
}
export const authServices = { loginUser, refreshToken }
