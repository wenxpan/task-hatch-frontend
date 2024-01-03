export interface User {
  _id: string
  username: string
  email: string
  isAdmin: boolean
}

export interface RegisterUserEntry {
  username: string
  email: string
  password: string
}

export interface AuthResult {
  accessToken: string
  user: User
}
