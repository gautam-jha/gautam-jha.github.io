import React from 'react';
import { About as AboutProp } from '../config/interface';
import styles from '../styles/About.module.scss';

export const About = (props: AboutProp) => {
    const { aboutImage, sectionTitle, sectionDescription } = props;
    return (
        <div id="about" className={styles.fullScreen}>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutInner}>
                    <h2 className={styles.aboutHeading}>{sectionTitle}</h2>
                    <div className={styles.aboutContent}>
                        <p className={styles.aboutText}>
                            {sectionDescription
                                .split('\n\n')
                                .map((item: string) => {
                                    return (
                                        <>
                                            <span>{item}</span>
                                            <br />
                                            <br />
                                        </>
                                    );
                                })}
                        </p>
                        <img
                            src={aboutImage}
                            alt={sectionDescription.substring(0, 20)}
                            className={styles.aboutImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
