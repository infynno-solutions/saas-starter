type Nullable<T> = null | T

type UserInterface = {
  name: string
  email: string
  emailVerified: Nullable<string>
}
