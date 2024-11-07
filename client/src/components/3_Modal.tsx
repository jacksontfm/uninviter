
interface Template {
    id: number;
    text: string;
  };

interface Props {
    closeModal: Function;
    selectedTemplate: Template;
}

const Modal: React.FC<Props> = ({ closeModal, selectedTemplate }) => {
    return (
        <>
            <div>
                This is the modal
                <br/>
                {selectedTemplate.text}
                <br/>
                <button onClick={() => closeModal()}>Close modal</button>
            </div>
        </>
    )
}

export default Modal