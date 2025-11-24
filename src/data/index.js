import profileImg from '../assets/profile.png';

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
            description: 'Completed with 97.7% aggregate in Mathematics, Physics, and Chemistry.'
        }
    ],
    interests: [
        { icon: '🎮', title: 'Gaming' },
        { icon: '📚', title: 'Reading' },
        { icon: '✈️', title: 'Traveling' },
        { icon: '🏏', title: 'Cricket' },
        { icon: '🏸', title: 'Badminton' },
        { icon: '🎵', title: 'Music' },
        { icon: '🏃', title: 'Fitness' }
    ]
};

export const career = {
    skills: {
        'Frontend Development': [
            'React', 'Vue.js', 'Redux', 'Vuex', 'Material UI', 'Vuetify'
        ],
        'Programming Languages': [
            'JavaScript', 'TypeScript', 'HTML5', 'CSS3'
        ],
        'Development Tools': [
            'Vite', 'Webpack', 'Git', 'BitBucket', 'VS Code'
        ]
    },
    experiences: [
        {
            company: 'Apple Inc.',
            title: 'Senior Software Engineer',
            period: 'Jan 2025 - Present',
            location: 'Hyderabad, India',
            description: 'Leading frontend development working for Apple Maps as a vendor from Payoda',
            achievements: [
                'Developed and maintained front-end applications for internal Apple Maps tools used by Reviewers and QC Reviewers to verify and validate map data quality.',
                'Built tools to streamline the review workflow and improve the accuracy of data verification for Apple Maps quality control teams.',
                'Collaborated with cross-functional engineering teams to integrate micro-frontends into the Apple Maps ecosystem, increasing intermodule communication efficiency by 10%.',
                'Optimized code performance and resolved UI bottlenecks, resulting in a 5% reduction in average page load time.'
            ],
            skills: ['React', 'Redux', 'TypeScript', 'Micro Frontends', 'GraphQL']
        },
        {
            company: 'Rakuten',
            title: 'Senior Software Engineer',
            period: 'Mar 2022 - Jan 2025',
            location: 'Bangalore, India',
            description: 'Leading frontend development and performance optimization initiatives.',
            achievements: [
                'Significantly improved the performance of a large-scale React.js application by 78% through comprehensive bundle size analysis, tree shaking, image optimization, and lazy loading techniques, resulting in a faster and smoother user experience.',
                'Successfully led the integration of Okta for secure and seamless user authentication, enhancing the overall login process and improving the application security for over 24,000 users.',
                'Collaborated closely with designers and stakeholders to create modern, intuitive, and accessible user interfaces using Figma, contributing to a 30% increase in overall user satisfaction and engagement.',
                'Spearheaded the migration of the existing codebase from Webpack 4 to Webpack 5, improving build performance, module federation support, and overall development efficiency by 25%.',
                'Achieved an accessibility score of 98% by implementing responsive design principles, semantic HTML, and ARIA best practices, while reducing the initial page load time by 50%, thus improving user experience for all users.'
            ],
            skills: ['React', 'Redux', 'Vite', 'Webpack', 'Okta', 'Jenkins', 'Bitbucket']
        },
        {
            company: 'Cognizant Technology Solutions',
            title: 'Programmer Analyst',
            period: 'Jan 2020 - Mar 2022',
            location: 'Bangalore, India',
            description: 'Developed and maintained React applications for JPMC.',
            achievements: [
                'Developed a highly responsive and accessible front-end application for JPMorgan Chase using React.js and Bootstrap, which enhanced the digital banking experience and led to a 30% increase in customer satisfaction.',
                'Built modular and reusable React components to streamline UI development and reduce duplication, utilizing npm and Yarn for efficient dependency and package management.',
                'Collaborated with back-end engineers and API architects to design and integrate robust RESTful APIs, reducing data retrieval time by 25% and enabling smooth synchronization across services.'
            ],
            skills: ['React', 'Material-UI', 'Bootstrap', 'Sass', 'RESTful APIs']
        }
    ],
    awards: [
        {
            year: '2024',
            title: 'Best Individual Contributor Award',
            company: 'Rakuten',
            description: 'Recognized for outstanding individual contributions and exceptional performance.'
        },
        {
            year: '2022',
            title: 'Best New Comer Award',
            company: 'Rakuten',
            description: 'Awarded for exceptional performance and quick adaptation as a new team member.'
        },
        {
            year: '2021',
            title: 'The Ultimate Contributor Award',
            company: 'Cognizant',
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
            title: 'From Junior to Senior Developer',
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
