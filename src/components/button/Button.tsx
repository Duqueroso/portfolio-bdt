import style from '@/components/button/button.module.css';


interface ButtonProps {
    textButton: string;
    click: () => void;
    color?: string;
}

export const Button = ({ textButton, click } : ButtonProps) => {
    return (

        <button className={style.buttonComponent} onClick={click}>
            <div>{textButton}</div>

        </button>
    )
}