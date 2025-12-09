import profileImg from '../assets/profile.jpg';

export const navigation = [
    { name: 'About', path: '/about' },
    { name: 'Career', path: '/career' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
];

export const home = {
    profileImage: profileImg,
    skills: [
        {
            icon: '💻',
            title: 'Frontend Development',
            description: 'Building responsive and performant web applications with modern technologies.',
            skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Redux', 'GraphQL']
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Creating beautiful and intuitive user interfaces with attention to detail.',
            skills: ['CSS3', 'Sass', 'Tailwind', 'Framer Motion', 'Material-UI', 'Styled Components']
        },
        {
            icon: '⚙️',
            title: 'Backend Integration',
            description: 'Connecting frontend applications with robust backend services.',
            skills: ['RESTful APIs', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Firebase']
        },
        {
            icon: '🚀',
            title: 'Performance & DevOps',
            description: 'Optimizing applications for speed and implementing CI/CD pipelines.',
            skills: ['Webpack', 'Docker', 'Jenkins', 'AWS', 'Git', 'GitHub Actions']
        }
    ],
    education: [
        {
            year: '2015 - 2019',
            degree: 'Bachelor of Technology in Electronics and Communication Engineering',
            school: 'Jawaharlal Nehru Technological University - Kakinada',
            description: 'Graduated with distinction, focusing on software engineering and web technologies.'
        },
        {
            year: '2013 - 2015',
            degree: 'Intermediate Education (MPC)',
            school: 'Siddartha Junior College',
            description: 'Completed with 94.1% aggregate overall.'
        }
    ],
    interests: [
        { icon: '📚', title: 'Reading' },
        { icon: '✈️', title: 'Traveling' },
        { icon: '🙏', title: 'Devotional' },
        { icon: '👨‍👩‍👧‍👦', title: 'Family Man' },
        { icon: '🏏', title: 'Cricket' },
        { icon: '🏸', title: 'Badminton' },
        { icon: '🏃', title: 'Fitness' }
    ]
};

export const career = {
    skills: {
        'Frontend Frameworks': [
            'React', 'Vue.js', 'Redux Toolkit', 'Vuex', 'React Query'
        ],
        'Programming Languages': [
            'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'
        ],
        'UI & Styling': [
            'Blueprint.js', 'styled-components', 'Bootstrap', 'Material UI', 'Vuetify', 'Figma'
        ],
        'Development Tools': [
            'Vite', 'Webpack 5', 'Storybook', 'Vitest', 'Git', 'GitHub', 'Bitbucket', 'Jenkins', 'VS Code'
        ],
        'APIs & Data': [
            'GraphQL', 'RESTful APIs', 'OpenAPI', 'MySQL'
        ],
        'Architecture': [
            'Micro Frontends', 'Monorepo (npm workspaces)', 'Okta Auth'
        ]
    }
    ,
    experiences: [
        {
            company: 'Apple Inc. (via Payoda)',
            title: 'Senior Software Engineer (Contractor)',
            period: 'Jan 2025 - Present',
            location: 'Hyderabad, India',
            description: 'Architecting React/TypeScript monorepo for FusionX Maps automation—scalable micro-frontends analyzing 20+ geospatial features (narrow roads, speed limits, landmarks) for global QC teams.',
            achievements: [
                'Engineered plugin architecture with Redux Toolkit, React Query, Blueprint.js—boosted cross-module scalability & developer velocity by 40%.',
                'Deployed micro-frontends within monorepo, accelerating Apple Maps data validation workflows by 15%.',
                'Optimized Vite builds & UI performance, reducing page load times by 5% and enabling 10% faster intermodule communication.',
                'Built tools streamlining review workflows for narrow roads, statutory speeds, landmarks—handling legacy automations like rail crossings & turn restrictions.'
            ],
            skills: ['React', 'TypeScript', 'Redux Toolkit', 'React Query', 'Vite', 'Micro Frontends', 'GraphQL', 'Blueprint.js', 'Storybook']
        }
        ,
        {
            company: 'Rakuten India',
            title: 'Senior Software Engineer I',
            period: 'Mar 2022 - Jan 2025',
            location: 'Bangalore, India',
            description: 'Drove 78% React app performance gains + Webpack 5 migration for 24K+ users.',
            achievements: [
                'Engineered 48% performance boost via bundle analysis, tree shaking, lazy loading—transformed large-scale React app UX.',
                'Led Okta authentication integration securing 24,000+ users with seamless login flows.',
                'Migrated Webpack 4→5 + achieved 98% accessibility (ARIA, semantic HTML), cutting load times 50%.',
                'Partnered with design teams via Figma for 30% user satisfaction growth through intuitive UIs.'
            ],
            skills: ['React', 'Webpack 5', 'Okta', 'Figma', 'Jenkins', 'Bitbucket', 'Redux', 'ARIA']
        },
        {
            company: 'Cognizant Technology Solutions',
            title: 'Programmer Analyst',
            period: 'Jan 2020 - Mar 2022',
            location: 'Bangalore, India',
            description: 'Engineered React digital banking platform for JPMorgan Chase',
            achievements: [
                'Built responsive React.js/Bootstrap front-end for \textbf{JPMorgan Chase} banking.',
                'Architected modular React components with npm/Yarn, cutting UI development time 40%.',
                'Integrated RESTful APIs with backend teams, slashing data retrieval 25% for high-volume transactions.'
            ],
            skills: ['React', 'Bootstrap', 'npm/Yarn', 'RESTful APIs', 'JPMorgan Chase']
        }
    ],
    awards: [
        {
            year: '2024',
            title: 'Individual Contributor Excellence Award',
            company: 'Rakuten India',
            description: 'Recognized for outstanding individual contributions and exceptional performance.'
        },
        {
            year: '2022',
            title: 'Best New Comer Award',
            company: 'Rakuten India',
            description: 'Awarded for exceptional performance and quick adaptation as a new team member.'
        },
        {
            year: '2021',
            title: 'The Ultimate Contributor Award',
            company: 'Cognizant Technology',
            description: 'Honored for significant contributions and dedication to project success.'
        }
    ],
    certifications: [
        {
            name: 'Frontend Developer (React)',
            issuer: 'HackerRank',
            date: '2024',
            link: 'https://www.hackerrank.com/certificates/3b03bd64ba21',
            skills: ['React', 'Frontend Development', 'Web Applications']
        },
        {
            name: 'JavaScript',
            issuer: 'HackerRank',
            date: '2024',
            link: 'https://www.hackerrank.com/certificates/4e52c891b885',
            skills: ['JavaScript', 'Problem Solving', 'Web Development']
        },
        {
            name: 'JavaScript Algorithms and Data Structures',
            issuer: 'freeCodeCamp',
            date: '2023',
            link: 'https://www.freecodecamp.org/certification/pavankalyanpayyavula/javascript-algorithms-and-data-structures',
            skills: ['JavaScript', 'Data Structures', 'Algorithms', 'Problem Solving']
        }
    ]
};

export const contact = {
    email: 'pavankalyanpayyavula24@gmail.com',
    socials: [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/pavankalyanpayyavula24/',
            icon: '💼',
            display: 'linkedin.com/in/pavankalyanpayyavula24'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/pavankalyanpayyavula-codes',
            icon: '🐱',
            display: '/github.com/pavankalyanpayyavula-codes'
        }
    ]
};

export const blogs = {
    categories: [
        { id: 'all', name: 'All Posts' },
        { id: 'tech', name: 'Technology' },
        { id: 'web', name: 'Web Development' },
        { id: 'career', name: 'Career Growth' },
        { id: 'tutorial', name: 'Tutorials' }
    ],
    posts: [
        {
            id: 1,
            title: 'Getting Started with React and TypeScript',
            category: 'web',
            date: 'Coming Soon',
            readTime: '10 min read',
            excerpt: 'A comprehensive guide to setting up and using TypeScript with React, including best practices and common pitfalls to avoid.',
            image: 'https://placehold.co/600x400/3b82f6/ffffff?text=React+%2B+TypeScript',
            mediumUrl: '#',
            comingSoon: true
        },
        {
            id: 2,
            title: 'Building Scalable Frontend Architecture',
            category: 'tech',
            date: 'Coming Soon',
            readTime: '12 min read',
            excerpt: 'Learn how to structure large-scale frontend applications using modern architecture patterns and best practices.',
            image: 'https://placehold.co/600x400/10b981/ffffff?text=Frontend+Architecture',
            mediumUrl: '#',
            comingSoon: true
        },
        {
            id: 3,
            title: 'From Zero to Frontend Developer',
            category: 'career',
            date: 'Coming Soon',
            readTime: '8 min read',
            excerpt: 'Key insights and lessons learned during my journey from a junior to senior developer position.',
            image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Career+Growth',
            mediumUrl: '#',
            comingSoon: true
        },
        {
            id: 4,
            title: 'Mastering CSS Grid and Flexbox',
            category: 'tutorial',
            date: 'Coming Soon',
            readTime: '15 min read',
            excerpt: 'A detailed tutorial on creating responsive layouts using CSS Grid and Flexbox with practical examples.',
            image: 'https://placehold.co/600x400/ec4899/ffffff?text=CSS+Layout',
            mediumUrl: '#',
            comingSoon: true
        }
    ]
};
