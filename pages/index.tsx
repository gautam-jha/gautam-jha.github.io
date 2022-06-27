import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { MockProp } from '../config/interface';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {threeWave} from '../helpers/three-wave';
import { server } from '../config';
import { About } from '../components/About';
import { Skill } from '../components/Skill';

const SideHeader = dynamic(()=> import('../components/SideHeader'), {
    ssr:false,
});


const Home = (props: MockProp) => {
    const {
        data:{about,skills},
    } = props;

    useEffect(()=>{
        const three = threeWave();
        three.init();

        return () => {
            three.destroy();
        };
    }, []);
    console.log('data',props);
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
            { about && <About {...about} /> }
            { skills && <Skill {...skills}/>}
        </div>
    );
};
export default Home;

export const getStaticProps = async () => {
    let data = [];
    try {
        data = await fetch(server + '/data/api.json').then((res) => res.json());
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            data: data ?? [],
        },
    };
};