'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const router=useRouter()
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            alert('password does not match')
            return;
        }
        try {
            const res=await fetch('/api/auth/register',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                email,password
              })
            })
            const data=await res.json()
            if(!res.ok){
              throw new Error(data.error)
            }
            console.log(data)
            router.push('/login')
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <input type="email" 
        placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>

         <input type="password" 
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <input type="password"
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default page