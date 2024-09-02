export type LoginType = "login" | "register"

export type LoginProps = {
    setLoginState: (loginFlow:LoginType) => void
}
