
    interface Slider {
        Picturehandle: string;
        videoHandle: string;
    }

    interface About {
        aboutImage: string;
        sectionTitle: string;
        sectionDescription: string;
    }

    interface Skill {
        name: string;
        level: number;
    }

    interface Skills {
        sectionTitle: string;
        sectionDescription: string;
        skills: Skill[];
    }

    interface Experience {
        company: string;
        position: string;
        website: string;
        startDate: string;
        endDate: string;
        logo: string;
        summary: string;
        highlights: string[];
    }

    interface Work {
        sectionTitle: string;
        sectionDescription: string;
        experiences: Experience[];
    }

    interface Api {
        slider: Slider[];
        about: About;
        skills: Skills;
        work: Work;
    }

    export interface MockProp {
        data: Api;
    }