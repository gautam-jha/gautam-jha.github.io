import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { Header } from '../components/Header';
import { server } from '../config';
import { MockProp } from '../config/interface';
import { About } from '../components/About';
import { Skill } from '../components/Skill';
import Banner from '../components/Banner';
import Experience from '../components/Experience';
import Icon from '../components/Icon';

const Home = (props: MockProp) => {
    const {
        data: { slider, about, skills, work, contact, banner },
    } = props;

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
                                streetAddress: 'F-170 Ladosarai, New Delhi, India',
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
            <Header />
            <div className={styles.bannerContainer}>
                <div className={styles.slider}>
                    <Banner slider={slider} />
                </div>
                <div className={styles.bannerText}>
                    <div className={styles.bannerInner}>
                        <p className={styles.bannerText__heading1}>
                            {banner?.text1}
                        </p>
                        <h1 className={styles.bannerText__heading2}>
                            {banner?.text2}
                        </h1>
                        <h3 className={styles.bannerText__heading3}>
                            {banner?.text3}
                        </h3>
                    </div>
                </div>
            </div>

            <About {...about} />

            <Skill {...skills} />

            <Experience {...work} />

            {contact && (
                <div id="contact">
                    <div className={styles.contactContainer}>
                        <h2 className={styles.experienceHeading}>
                            {contact.sectionTitle}
                        </h2>
                        <p>{contact.sectionDescription}</p>
                        {contact?.social &&
                            contact?.social?.map((social) => (
                                <a
                                    className={styles.social__links}
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={social.name}
                                >
                                    <Icon type={social.name} />
                                </a>
                            ))}
                    </div>
                </div>
            )}

            <footer className={styles.footer}>Developed by Gautam Jha</footer>
        </div>
    );
};

export default Home;

Home.getInitialProps = async () => {
    // fetch api.json and return data
    let data = [];
    try {
        data = await fetch(server + '/data/api.json').then((res) => res.json());
    } catch (e) {
        console.log(e);
    }
    return {
        data: data ?? [],
    };
};
