import { useState } from 'react'
import Guests from "./components/1_Guests.tsx"

interface Props {
  userName: string;
  userId: number;
}

export default function App({ userName, userId }: Props) {

  const [index, setIndex] = useState<number>(0);

  function nextView () {
    return setIndex(index+1);
  }

  function previousView () {
    if (index === 0) {
      return;
    }
    return setIndex(index-1);
  }

  function determineView () {
    const viewArr = [<Guests userId={userId}/>]
    return viewArr[index]
  }

  return (
    <>
      <div>
        <span>Welcome, {userName}</span>
      </div>
      <button onClick={previousView}>Go back</button>
      <button onClick={nextView}>Next</button>
      <div>{determineView()}</div>
    </>
  )
}
