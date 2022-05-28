import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { MockProp } from '../config/interface';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {threeWave} from '../helpers/three-wave';

const SideHeader = dynamic(()=> import('../components/SideHeader'), {
    ssr:false,
});


const Home = (props: MockProp) => {
    const {
        data,
    } = props;

    useEffect(()=>{
        const three = threeWave();
        three.init();

        return () => {
            three.destroy();
        };
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Gautam Jha - Full Stack Developer / Freelancer</title>
                <meta
                    name="description"
                    content="Gautam Jha, Programmer, Javascript / PHP / Python Developer, Student from DTU(Formally DCE), Worked with Amdocs, SHL, 9Yards Technology, Collabera."
                />
                <meta
                    name="google-site-verification"
                    content="uPoZCOjKbbtIVTSGl3SfL_Etk7oOZfwAyXIoMT1QGj4"
                />
                <meta
                    name="msvalidate.01"
                    content="173868577B3DDF767ADCA23200F50319"
                />
                <meta httpEquiv="content-language" content="en-gb" />
                <link rel="icon" href="/favicon.ico" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'http://schema.org',
                            '@type': 'Person',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'New Delhi',
                                addressRegion: 'IN',
                                postalCode: '110030',
                                streetAddress:
                                    'F-170 Ladosarai, New Delhi, India',
                            },
                            colleague: [
                                'http://www.xyz.edu/students/alicejones.html',
                                'http://www.xyz.edu/students/bobsmith.html',
                            ],
                            email: 'mailto:gautiii@live.com',
                            image: 'gautamjha.jpg',
                            jobTitle: 'Software Engineer',
                            name: 'Gautam Jha',
                            telephone: '(425) 123-4567',
                            url: 'https://gautam-jha.github.io/',
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org/',
                            '@type': 'WebSite',
                            name: 'Gautam Jha | Full Stack Developer | Portfolio',
                            url: 'https://gautam-jha.github.io/',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://gautam-jha.github.io/?q={search_term_string}',
                                'query-input':
                                    'required name=search_term_string',
                            },
                        }),
                    }}
                />
            </Head>
            <SideHeader />
            <section className="section skills" data-sr-id="2" style={{visibility: 'visible',
                opacity: 1,
                transition: 'opacity 0.6s cubic-bezier(0.694, 0, 0.335, 1) 0s'}}>
                <div className="section__title">Skills</div>
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
        </div>
    );
};
export default Home;