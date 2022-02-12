import { useState } from "react"
import {auth} from "../lib/firebase" 
import {signInWithEmailAndPassword} from 'firebase/auth'
const Login:React.VFC = () => {
  // const auth = getAuth()
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<string>();
  const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    console.log(email)
  }
  const handlerChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    console.log(password);
  }
  const handleLogin = async () => {
    console.log("ログイン開始")
    await signInWithEmailAndPassword(auth, email!, password!).then( async(userCredential)=>{
      console.log("ログイン成功")
      const token = await userCredential.user.getIdToken()
      setToken(token);
    }).catch((e)=>{console.log(e)})
  }
  return (
    <>
    <section className={"login-area"}>
      <div className={"title"}>
        <h1>Token取得のためログインしてください。</h1>
      </div>
      <div className={"body"}>
        {/* <form onSubmit={()=>{handleLogin()}}> */}
          <div className={"email"}>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="email" onChange={(e) => handlerChangeEmail(e)}/>
          </div>
          <div className="password">
            <label>パスワード</label>
            <input name="pasword" type="password" placeholder="password" onChange={(e)=>handlerChangePassword(e)}/>
          </div>

          <div>
            <button type="submit" onClick={()=>{handleLogin()}}>トークン取得</button>
          </div>
        {/* </form> */}
      </div>
    </section>
    <section>
      <div>
        <p>{token ? token : "Tokenがここにきます"}</p>
      </div>
    </section>
    </>
  )
}

export default Login;