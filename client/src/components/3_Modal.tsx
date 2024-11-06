
interface Template {
    id: number;
    text: string;
  };

interface Props {
    templates: Template[];
    selectATemplate: Function;
    selectedTemplate: Template | null;
}

const Modal: React.FC<Props> = ({ templates, selectATemplate }) => {
    return (
        <>
            {templates.map((template, index) => (
                <div className="templateCard" key={index}>
                    <div className="templateText">{template.text}</div>
                    <div className="templateSelect">
                        <button onClick={selectATemplate(template)}>Select this template</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Modal