'use client'
import { signIn } from 'next-auth/react'
import {  useRouter } from 'next/navigation'
import React from 'react'

function page() {
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const router=useRouter()
  //
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const result=await signIn("credentials",{
        email,
        password,
        redirect:false
      })
      if(result?.error){
        console.log(result.error)
      }else{
        router.push('/')
      }
    } catch (error) {
      
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
          <input type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
     <div>
      Don't have an account?
      <button onClick={()=>router.push('/register')}>Sign In</button>
     </div>
    </div>
  )
}

export default page