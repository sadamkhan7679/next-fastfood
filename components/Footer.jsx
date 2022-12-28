import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          ESSO KLEPPESTØ - ASK&Oslash;Y's BESTE BURGER!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>HVOR FINNER DU OSS? </h1>
          <p className={styles.text}>
            Klampavikvegen 4
            <br /> 5321 Kleppestø
            <br /> 56 14 02 95
          </p>


        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ÅPNINGSTIDER</h1>
          <p className={styles.text}>
           MANDAG - FREDAG
            <br /> 06:00 – 00:00
          </p>
          <p className={styles.text}>
            LØRDAG
            <br /> 08:00 – 00:00
          </p>
          <p className={styles.text}>
            SØNDAG
            <br /> 09:00 – 00:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
