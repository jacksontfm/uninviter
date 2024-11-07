import { useState, useEffect } from 'react';
import Modal from './components/3_Modal.tsx';
import './app.css'

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    function successToast () {
      return toast(`Your invitations and uninvitations have been sent!`);
    }


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        {/* header */}
        <div className="fixed w-full top-0 left-0 flex justify-between px-6 py-4 z-10">
          <span className="italic py-2">Welcome, {userName}</span>
          <h1 className="text-2xl font-bold text-gray-700">Uninviter</h1>
          <button className="w-1/4 bg-blue-400 text-white rounded-lg py-2 hover:bg-blue-500 transition duration-200" onClick={() => returnToStart()}>Return to start</button>
        </div>

        <div className="fixed left-20">
          {/* invite columns */}
          <div className="flex">
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold text-gray-700">Invited guests</span>
              <select className="border min-w-60 m-5" id="invited" size={10}/>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold text-gray-700">Uninvited guests</span>
              <select className="border min-w-60 m-5" id="uninvited" size={10}/>
            </div>
          </div>
          {/* invite field & buttons */}
          <div className="flex flex-col items-center justify-center">
            <input className="relative border min-w-96 text-center" placeholder="Enter an email address" type="text" onChange={e => setNewGuest(e.target.value)}></input>
            <div className="flex items-center justify-center w-96 p-2">
              <button 
                className="mr-5 min-w-40 text-center p-5 bg-blue-400 text-white rounded-lg py-2 hover:bg-blue-500 transition duration-200"
                onClick={inviteGuest}
                >Invite
              </button>
              <button
                className="ml-5 min-w-40 text-center p-5 bg-red-400 text-white rounded-lg py-2 hover:bg-red-500 transition duration-200"
                onClick={uninviteGuest}
                >Uninvite
              </button>
            </div>
          </div>
        </div>

        {/* templates */}
        <div className="fixed right-20 max-w-xl">
          {templates.map((template, index) => (
            <div className="border my-5" key={index}>
              <div className="p-2 italic">{template.text}</div>
              <button
                className="ml-96 my-2 w-1/3 bg-blue-400 text-white rounded-lg p-2 hover:bg-blue-500 transition duration-200"
                onClick={() => {openModal(template)}}
                >Select this template
              </button>
            </div>
          ))}
        </div>

        {/* modal */}
        {showModal && selectedTemplate && (
          <div className="fixed z-10 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-start overflow-y-auto pt-1">
            <Modal invitedGuests={invitedGuests} uninvitedGuests={uninvitedGuests} closeModal={closeModal} selectedTemplate={selectedTemplate} successToast={successToast}/>
          </div>
        )}
      </div>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                theme="light"
            />
    </>
  )
}
