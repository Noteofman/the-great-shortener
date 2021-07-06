export interface RegisterFormData {
  email: string,
  password: string,
  name: string,
}

export interface LoginFormData {
  email: string,
  password: string,
}

export interface LinkFormData {
  url: string,
}

export interface UserResponse {
  jwt: string,
  user: AuthedUser,
}


export interface AuthedUser {
  id: string,
  name: string,
  email: string
}

export interface LinkObj {
  linkId: string,
  shortenedLink: string,
  longLink: string
  authorId: string,
}
