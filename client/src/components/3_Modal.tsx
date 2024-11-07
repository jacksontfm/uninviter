
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
    returnToStart: Function;
}

const Modal: React.FC<Props> = ({ invitedGuests, uninvitedGuests, closeModal, selectedTemplate, returnToStart }) => {

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
                guests: invitedGuests
            })
        });
        return response.json();
    }

    async function sendUninvites () {
        const response = await fetch(`${URL}/senduninvited`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guests: uninvitedGuests
            })
        });
        return response.json();
    }

    async function sendEmails () {
        await sendInvites();
        await sendUninvites();
        returnToStart();
        return alert("Your invitations and uninvitations have been sent!");
    }

    return (
        <>
            <div>
                This is the modal
                <br/>
                Here are your invited guests: {getInvitedEmails()}
                <br/>
                Here are your uninvited guests: {getUninvitedEmails()}
                <br/>
                Here is the template you've selected: {selectedTemplate.text}
                <br/>
                Ready to send? <button onClick={sendEmails}>Send invitations and uninvitations</button>
                <br/>
                <button onClick={() => closeModal()}>Close and go back</button>
            </div>
        </>
    )
}

export default Modal