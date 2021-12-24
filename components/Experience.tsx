import React, { ReactElement } from 'react';
import { Work } from '../config/interface';
import styles from '../styles/Experience.module.scss';

export default function Experience({
    sectionDescription,
    sectionTitle,
    experiences,
}: Work): ReactElement {
    return (
        <div id="experiece" className={styles.fullScreen}>
            <div className={styles.experienceContainer}>
                <div className={styles.experienceInner}>
                    <h2 className={styles.experienceHeading}>{sectionTitle}</h2>
                    <p>{sectionDescription}</p>
                    <div className={styles.experienceContent}>
                        {experiences.map((experience, index) => (
                            <div className={styles.experienceItem} key={index}>
                                <h3 className={styles.experienceItemHeading}>
                                    <span
                                        className={
                                            styles.experienceItemHeading__company
                                        }
                                    >
                                        {experience.company}
                                    </span>
                                </h3>
                                <p className={styles.experienceItemDescription}>
                                    <span
                                        className={
                                            styles.experienceItemText__title
                                        }
                                    >
                                        {experience.position}
                                    </span>{' '}
                                    |{' '}
                                    <span
                                        className={
                                            styles.experienceItemHeading__duration
                                        }
                                    >
                                        {experience.duration}
                                    </span>
                                </p>
                                <p className={styles.experienceItemText}>
                                    <span
                                        className={
                                            styles.experienceItemText__description
                                        }
                                    >
                                        <span>{experience.description}</span>
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
