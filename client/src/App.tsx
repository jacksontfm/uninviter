import { useState, useEffect } from 'react';
import Modal from './components/3_Modal.tsx';
import './app.css'

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

export default function App({ userName, userId, returnToStart }: Props) {

    //const [selectedGuest, setSelectedGuest] = useState<Guest>()
    //const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuest, setNewGuest] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const [invitedGuests, setInvitedGuests] = useState<Guest[]>([]);
    const [uninvitedGuests, setUninvitedGuests] = useState<Guest[]>([]);

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
      if (newGuest === "") {
        return;
      };
      let invitedArr = invitedGuests;
      let invited = {
        user_id: userId,
        guest_email: newGuest,
        invited: true
      }
      let invitedList = document.getElementById("invited");
      invitedList?.append(createOption(invited));
      invitedArr.push(invited);
      setInvitedGuests(invitedArr);
      setNewGuest("");
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value="";
      };
    };

    function uninviteGuest () {
      if (newGuest === "") {
        return;
      };
      let uninvitedArr = uninvitedGuests;
      let uninvited = {
          user_id: userId,
          guest_email: newGuest,
          invited: false
      }
      let uninvitedList = document.getElementById("uninvited");
      uninvitedList?.append(createOption(uninvited));
      uninvitedArr.push(uninvited);
      setUninvitedGuests(uninvitedArr);
      setNewGuest("");
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value="";
      };
    };

    // function deleteGuest () {};

    //templates
    async function getTemplates () {
        await fetch(`${URL}/templates`,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json()).then((res) => setTemplates(res));
    }

    //modal
    function openModal (template: Template) {
      setSelectedTemplate(template);
      setShowModal(true);
    }

    function closeModal () {
      setShowModal(false);
      setSelectedTemplate(null);
    }


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div>
          <span className="italic">Welcome, {userName}</span><button onClick={() => returnToStart()}>Return to start</button>
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
                <button onClick={() => {openModal(template)}}>Select this template</button>
              </div>
            </div>
          ))}
        </div>
        {showModal && selectedTemplate && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-start overflow-y-auto pt-1">
            <Modal invitedGuests={invitedGuests} uninvitedGuests={uninvitedGuests} closeModal={closeModal} selectedTemplate={selectedTemplate} returnToStart={returnToStart}/>
          </div>
        )}
      </div>
    </>
  )
}
