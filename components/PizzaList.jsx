import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ASK&Oslash;Y's BESTE BURGER!</h1>
      <p className={styles.desc}>
        Besøk oss i Kleppestø og smak på Ask&oslash;y's beste burger! Bestill på nett eller via telefon.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
