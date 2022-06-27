import React from 'react';
import { About as AboutProp } from '../config/interface';
// import styles from '../styles/About.module.scss';

export const About = (props: AboutProp) => {
    const { aboutImage, sectionTitle, sectionDescription } = props;
    return (
        <section
            className="section about"
            data-sr-id="2"
            style={{
                visibility: 'visible',
                opacity: 1,
                transition: 'opacity 0.6s cubic-bezier(0.694, 0, 0.335, 1) 0s',
            }}
        >
            <div className="section__title">
                {sectionTitle}
                <img
                    src={aboutImage}
                    alt="gautam jha photo"
                    style={{ padding: '20px 15px 10px 25px' }}
                />
            </div>
            <div>
                <div
                    className="section__content"
                    dangerouslySetInnerHTML={{
                        __html: sectionDescription,
                    }}
                ></div>
            </div>
        </section>
    );
};
