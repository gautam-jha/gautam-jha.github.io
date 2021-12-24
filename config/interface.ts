export interface Slider {
    Picturehandle: string;
    videoHandle: string;
}

export interface About {
    aboutImage: string;
    sectionTitle: string;
    sectionDescription: string;
}

export interface Skill {
    name: string;
    level: number;
    category: string;
}

export interface Skills {
    sectionTitle: string;
    sectionDescription: string;
    skillCategory: string[];
    skills: Skill[];
}

interface Experience {
    company: string;
    position: string;
    website: string;
    duration: string;
    logo: string;
    description: string;
    highlights: string[];
}

export interface Work {
    sectionTitle: string;
    sectionDescription: string;
    experiences: Experience[];
}

export enum IconType {
    linkedin = 'linkedin',
    github = 'github',
    twitter = 'twitter',
    mail = 'mail',
}
interface Contact {
    sectionTitle: string;
    sectionDescription: string;
    social: Array<{
        name: IconType;
        link: string;
    }>;
}

interface Api {
    slider: Slider[];
    about: About;
    skills: Skills;
    work: Work;
    contact: Contact;
    banner: {
        text1: string;
        text2: string;
        text3: string;
    };
}

export interface MockProp {
    data: Api;
}
