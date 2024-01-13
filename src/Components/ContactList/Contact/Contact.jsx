import { FaUserTie } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from "./Contact.module.css";

export default function Contact({ name, number, children }) {
  return (
    <>
      <div className={css.info}>
        <p className={css.name}>
          <FaUserTie className={css.icon} />
          {name}
        </p>
        <p className={css.telephoneNumber}>
          <BsFillTelephoneFill className={css.icon} />
          {number}
        </p>
      </div>
      {children}
    </>
  );
}
