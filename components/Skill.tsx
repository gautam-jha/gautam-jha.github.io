import React from 'react';
import { Skill as SkillInt, Skills } from '../config/interface';
import styles from '../styles/Skill.module.scss';

export const Skill = (props: Skills) => {
    const { skills, sectionTitle, sectionDescription, skillCategory } = props;
    return (
        <section className="section skills" data-sr-id="2" style={{visibility: 'visible',
            opacity: 1,
            transition: 'opacity 0.6s cubic-bezier(0.694, 0, 0.335, 1) 0s'}}>
            <div className="section__title">{sectionTitle}</div>
            <div>
                <div className="section__content">
                    <div className="skillz">
                        <div className="skillz__category">
                            <div className="skillz__category__label">Languages</div>
                            <ul>
                                <li className="skillz__category__item">PHP, Python</li>
                                <li className="skillz__category__item">JavaScript, NodeJS</li>
                                <li className="skillz__category__item">Shell Scripting, Typescript</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">Frameworks</div>
                            <ul>
                                <li className="skillz__category__item">ReactJS</li>
                                <li className="skillz__category__item">React Native</li>
                                <li className="skillz__category__item">FastAPI, Laravel</li>
                                <li className="skillz__category__item">Codeigniter</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">Tools</div>
                            <ul>
                                <li className="skillz__category__item">VCS - Github/Gitlab/Bitbucket</li>
                                <li className="skillz__category__item">Terminal, Putty, Docker</li>
                                <li className="skillz__category__item">GCP / AWS</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">CMS</div>
                            <ul>
                                <li className="skillz__category__item">WordPress, Shopify</li>
                                <li className="skillz__category__item">OJS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="skillz">
                        <div className="skillz__category">
                            <div className="skillz__category__label">Databases</div>
                            <ul>
                                <li className="skillz__category__item">MongoDB, Firebase, Scylladb</li>
                                <li className="skillz__category__item">MySql, Postgresql</li>
                                <li className="skillz__category__item">Oracle, Microsoft SQL Server</li>
                                <li className="skillz__category__item">ElasticSearch</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">Operating System</div>
                            <ul>
                                <li className="skillz__category__item">Linux (Debian/Arch/RedHat)</li>
                                <li className="skillz__category__item">MacOS</li>
                                <li className="skillz__category__item">Windows (10/11/Server)</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">UI Frameworks</div>
                            <ul>
                                <li className="skillz__category__item">Tailwindcss</li>
                                <li className="skillz__category__item">Material UI, Bootstrap</li>
                                <li className="skillz__category__item">Chakra UI</li>
                            </ul>
                        </div>
                        <div className="skillz__category">
                            <div className="skillz__category__label">Others</div>
                            <ul>
                                <li className="skillz__category__item">Next.js</li>
                                <li className="skillz__category__item">GraphQL, Gutenberg, WP-REST</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
