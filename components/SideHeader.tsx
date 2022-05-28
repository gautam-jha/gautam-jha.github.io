import { useState } from 'react';
import styles from '../styles/Header.module.scss';
import { Typewriter } from 'react-simple-typewriter';

const SideHeader = () => {
    const [typewrite] = useState([
        'Namaste 🙏',
        'Hello 👋',
        'Hola 👋',
        'Bonjour 🙌',
        'Konnichiwa 🙏',
    ]);

    return (
        <header className="intro">
            <h1 className={styles.typewriter}>
                <Typewriter words={typewrite} loop={true} />
            </h1>
            <h2 className="intro__tagline">
                {'I\'m'} <span className="name">Gautam Jha</span>, <br />
                Full-Stack Developer | Software Architect
                👨‍💻
            </h2>
            <h4>“The greatest teacher, Failure is” ~ Yoda </h4>
            <h3 className="intro__contact">
                <span>Get in touch&nbsp;&nbsp;</span>👉&nbsp;&nbsp;
                <span>
                    <a
                        href="mailto:gautam.jha@outlook.in"
                        target="_blank"
                        className="highlight-link"
                        rel="noreferrer"
                    >
                        gotham@outlook.in
                    </a>
                </span>
            </h3>
            <h3 className="intro__contact">
                <span>Download C.V.&nbsp;&nbsp;</span>👉&nbsp;&nbsp;
                <span>
                    <a
                        href="/Gautam_Jha_Full_Stack_Developer.pdf"
                        target="_blank"
                        className="highlight-link"
                        rel="noreferrer"
                    >
                        Click Here
                    </a>
                </span>
            </h3>
        </header>
    );
};

export default SideHeader;
