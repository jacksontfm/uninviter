import { useState } from 'react';

interface Props {
    userId: number;
  }

export default function Guests({ userId }: Props) {

    const [selectedGuest, setSelectedGuest] = useState<string>("")

    const invited:string[] = [];
    const uninvited:string[] = [];

    function handleInviteSwitch () {
        if (invited.includes(selectedGuest)) {
            const index = invited.indexOf(selectedGuest);
            invited.splice(index, 1);
            uninvited.push(selectedGuest)
        }
        if (uninvited.includes(selectedGuest)) {
            const index = uninvited.indexOf(selectedGuest);
            uninvited.splice(index, 1);
            invited.push(selectedGuest)
        }
    }

    

    return (
        <>
            <div>
                <select name="Invited" size={10}>
                
                </select>
            </div>
            <button onClick={handleInviteSwitch}>Switch</button>
        </>
    )
}
