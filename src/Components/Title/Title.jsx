import css from "./Title.module.css"
export default function Title({ text }) {
    return <h1 className={css.title}>{text}</h1>;
}
