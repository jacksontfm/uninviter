import { useState, useEffect } from 'react';
import Modal from './components/3_Modal.tsx';

interface Props {
  userName: string;
  userId: number;
  returnToStart: Function;
};

interface Guest {
  id?: number;
  user_id: number;
  guest_email: string;
  invited: boolean;
};

interface Template {
  id: number;
  text: string;
};

export default function App({ userName, userId }: Props) {

    //const [selectedGuest, setSelectedGuest] = useState<Guest>()
    //const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuest, setNewGuest] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const invitedGuests:Guest[] = [];
    const uninvitedGuests:Guest[] = [];

    const URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
      //handleFetchGuests();
      getTemplates();
    }, []);

    // async function handleFetchGuests () {
    //     const guests = await fetch(`${URL}/guests?user_id=${userId}`,
    //     {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //     }).then((res) => res.json());
    //     Promise.all(guests).then((res) => {setGuests(res); mapGuests()});
    // };

    function createOption (guest:Guest) {
        let newOption = document.createElement('option');
        newOption.innerHTML = guest.guest_email;
        return newOption;
    };

    // function mapImportedGuests () {
    //     for (let guest of guests) {
    //         if (guest.invited === true) {
    //             invitedGuests.push(guest);
    //         }
    //         if (guest.invited === false) {
    //             uninvitedGuests.push(guest);
    //         }
    //     }
    // }

    // function mapGuests () {
    //     let invitedList = document.getElementById("invited");
    //     invitedGuests.map((guest) => {
    //         invitedList?.append(createOption(guest));
    //     });
    //     let uninvitedList = document.getElementById("uninvited");
    //     uninvitedGuests.map((guest) => {
    //         uninvitedList?.append(createOption(guest));
    //     });
    // };

    // function handleInviteSwitch () {

    // };

    function inviteGuest () {
        let invited = {
            user_id: userId,
            guest_email: newGuest,
            invited: true
        }
        let invitedList = document.getElementById("invited");
        invitedList?.append(createOption(invited));
        invitedGuests.push(invited);
    };

    function uninviteGuest () {
        let uninvited = {
            user_id: userId,
            guest_email: newGuest,
            invited: false
        }
        let uninvitedList = document.getElementById("uninvited");
        uninvitedList?.append(createOption(uninvited));
        uninvitedGuests.push(uninvited);
    };

    function openModal () {
      setShowModal(true);
    }

    function closeModal () {
      setShowModal(false);
    }

    // function deleteGuest () {};

    //templates
    async function getTemplates () {
        await fetch(`${URL}/templates`,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json()).then((res) => setTemplates(res));
    }

    function selectATemplate (template: Template) {
      setSelectedTemplate(template);
    };


  return (
    <>
      <div>
        <span>Welcome, {userName}</span>
      </div>
      <div>
        <select id="invited" size={10}/>
        <select id="uninvited" size={10}/>
      </div>
      <input placeholder="Enter an email address" type="text" onChange={e => setNewGuest(e.target.value)}></input>
      <button onClick={inviteGuest}>Invite</button>
      <button onClick={uninviteGuest}>Uninvite</button>
      <div>
        {templates.map((template, index) => (
          <div className="templateCard" key={index}>
            <div className="templateText">{template.text}</div>
            <div className="templateSelect">
              <button onClick={() => {selectATemplate(template); openModal()}}>Select this template</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
