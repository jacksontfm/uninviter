
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
}

const Modal: React.FC<Props> = ({ invitedGuests, uninvitedGuests, closeModal, selectedTemplate }) => {

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
                Ready to send? <button>Send invitations and uninvitations</button>
                <br/>
                <button onClick={() => closeModal()}>Close and go back</button>
            </div>
        </>
    )
}

export default Modal