import { useState } from 'react'

interface Props {
  userName: string;
  userId: number;
}

export default function App({ userName, userId }: Props) {


  return (
    <>
      <h1>Uninviter</h1>
      <div>the userId is {userId}</div>
      <br/>
      <div>the logged in user is {userName}</div>
    </>
  )
}
