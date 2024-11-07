interface Template {
    id: number;
    text: string;
};

interface Guest {
    id?: number;
    user_id: number;
    guest_email: string;
    invited: boolean;
};

interface Props {
    invitedGuests: Guest[];
    uninvitedGuests: Guest[];
    closeModal: Function;
    selectedTemplate: Template;
    successToast: Function;
}

const Modal: React.FC<Props> = ({ invitedGuests, uninvitedGuests, closeModal, selectedTemplate, successToast }) => {

    const URL = import.meta.env.VITE_API_URL;

    function getInvitedEmails () {
        let invitedEmails = [];
        for (let guest of invitedGuests) {
            invitedEmails.push(guest.guest_email);
        }
        return invitedEmails.join(', ');
    }

    function getUninvitedEmails () {
        let uninvitedEmails = [];
        for (let guest of uninvitedGuests) {
            uninvitedEmails.push(guest.guest_email);
        }
        return uninvitedEmails.join(', ');
    }

    async function sendInvites () {
        const response = await fetch(`${URL}/sendinvited`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guests: invitedGuests,
                text: selectedTemplate.text
            })
        });
        return response.json();
    }

    async function sendUninvites () {
        const response = await fetch(`${URL}/senduninvited`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guests: uninvitedGuests,
                text: selectedTemplate.text
            })
        });
        return response.json();
    }

    async function sendEmails () {
        await sendInvites();
        await sendUninvites();
        successToast();
        closeModal();
    }

    return (
        <>
            <div className="my-auto flex flex-col min-h-96 bg-white p-5 rounded-lg w-4/5 overflow-y-auto box-border justify-center">
                <h1 className="text-center text-2xl font-bold text-gray-700">Ready to send?</h1>
                <br/>
                <span className="font-bold text-gray-700">Here are your invited guests:</span>
                <span className="text-center p-2">{getInvitedEmails()}</span>
                <br/>
                <span className="font-bold text-gray-700">Here are your uninvited guests:</span>
                <span className="text-center p-2">{getUninvitedEmails()}</span>
                <br/>
                <span className="font-bold text-gray-700">Here is the template you've selected:</span>
                <span className="p-2">{selectedTemplate.text}</span>
                <br/>
                <div className="flex flex-col justify-center items-center">
                    <button
                        className="w-1/3 bg-blue-400 text-white rounded-lg py-2 mt-4 hover:bg-blue-500 transition duration-200"
                        onClick={sendEmails}
                        >Send invites
                    </button>
                    <button
                        className="w-1/3 bg-red-400 text-white rounded-lg py-2 mt-4 hover:bg-red-500 transition duration-200"
                        onClick={() => closeModal()}
                        >Close and go back
                    </button>
                </div>
            </div>
        </>
    )
}

export default Modal