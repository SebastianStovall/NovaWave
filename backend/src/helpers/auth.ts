import crypto from 'crypto'

// generate random session token
export const random = () => crypto.randomBytes(128).toString('base64')

// encrypt user password
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update((process.env.SECRET as string)).digest('hex')
}
