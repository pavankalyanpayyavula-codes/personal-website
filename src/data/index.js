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
        'Languages & Frameworks': [
            'React', 'Vue.js', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Redux Toolkit', 'Vuex', 'React Query'
        ],
        'Leadership & Collaboration': [
            'Team Leadership', 'Mentoring', 'Technical Interviewing', 'Code Review', 'Cross-functional Collaboration'
        ],
        'AI Tools': [
            'Claude AI', 'Copilot AI', 'Gemini Pro', 'Cursor'
        ],
        'Tools & Platforms': [
            'Vite', 'Webpack', 'Git', 'GitHub', 'Bitbucket', 'Jenkins', 'Figma', 'Visual Studio Code', 'Storybook', 'Vitest', 'Blueprint.js', 'Styled-components'
        ],
        'Database & APIs': [
            'GraphQL', 'RESTful APIs'
        ]
    },
    experiences: [
        {
            company: 'Payoda Technologies (Client: Apple)',
            title: 'Senior Software Engineer I',
            period: 'Jan 2025 - Present',
            location: 'Hyderabad, India',
            description: 'Leading frontend engineering for Apple Maps review tools and shared systems used by production reviewers.',
            achievements: [
                'Lead and mentor a team of 4 frontend developers, owning sprint planning, code reviews, technical direction, and technical interviews for front-end hiring.',
                'Built a new Apple Maps feature from scratch that lets reviewers verify landmark-based turn-by-turn directions, taking it from initial design through full production launch.',
                'Fixed a persistent, hard-to-diagnose bug where the app’s automatic break-tracking feature failed to pause correctly when a reviewer’s screen locked or switched tabs, a production issue that had gone unresolved by others on the team.',
                'Built a new analytics feature that shows managers how much time reviewers spend on each task, giving the team better visibility into productivity.',
                'Designed the shared component system and framework that now powers 20+ feature modules across the application, making it faster for the team to build and ship new features.',
                'Shipped 70+ bug fixes and new features across a dozen+ areas in a live Apple Maps review tool used daily by production reviewers.'
            ],
            skills: ['React', 'Vue.js', 'TypeScript', 'Redux Toolkit', 'Vuex', 'React Query', 'Vite', 'GraphQL', 'Blueprint.js', 'Storybook']
        },
        {
            company: 'Rakuten India',
            title: 'Senior Software Engineer I',
            period: 'Mar 2022 - Jan 2025',
            location: 'Bangalore, India',
            description: 'Built and improved large-scale React applications while mentoring engineers and supporting frontend hiring.',
            achievements: [
                'Mentored 3 junior engineers through code reviews and pairing sessions, and participated in technical interviews for front-end engineering candidates.',
                'Led the integration of Okta for secure, seamless user authentication, strengthening login security across the application’s user base.',
                'Improved the performance of a large-scale React.js application through bundle size analysis, tree shaking, image optimization, and lazy loading, resulting in a noticeably faster and smoother user experience.',
                'Collaborated closely with designers and stakeholders to create modern, intuitive, and accessible user interfaces using Figma.',
                'Spearheaded the migration of the existing codebase from Webpack 4 to Webpack 5, improving build performance, module federation support, and overall development efficiency.'
            ],
            skills: ['React', 'JavaScript', 'Webpack 5', 'Okta', 'Figma', 'Jenkins', 'Bitbucket', 'Redux', 'ARIA']
        },
        {
            company: 'Cognizant Technology Solutions (Client: JP Morgan & Chase)',
            title: 'Programmer Analyst',
            period: 'Jan 2020 - Mar 2022',
            location: 'Bangalore, India',
            description: 'Engineered frontend experiences for a digital banking platform.',
            achievements: [
                'Engineered a responsive React.js/Bootstrap front-end for the digital banking platform, improving the overall user experience.',
                'Partnered with backend engineers to integrate RESTful APIs, improving data retrieval speed and enabling seamless cross-service synchronization for high-volume banking transactions.'
            ],
            skills: ['React', 'JavaScript', 'Bootstrap', 'RESTful APIs', 'JPMorgan Chase']
        }
    ],
    awards: [
        {
            year: '2026',
            title: 'Persistence Award',
            company: 'Payoda Technologies, Apple Project',
            description: 'Recognized for persistence and commitment while delivering critical production work.'
        },
        {
            year: '2022 - 2024',
            title: 'Individual Contributor Excellence Award & Best Newcomer Award',
            company: 'Rakuten India',
            description: 'Recognized for exceptional individual contribution and strong performance as a new team member.'
        },
        {
            year: 'October 2021',
            title: 'The Ultimate Contributor Award',
            company: 'Cognizant Technology',
            description: 'Honored for significant contributions and dedication to project success.'
        }
    ],
    education: [
        {
            year: '2019',
            degree: 'ECE - B.Tech',
            school: 'Jawaharlal Nehru Technological University, Kakinada',
            description: 'Bachelor of Technology in Electronics and Communication Engineering.'
        }
    ],
    certifications: [
        {
            name: 'Frontend Developer (React)',
            issuer: 'HackerRank',
            date: 'Credential ID: 3b03bd64ba21',
            link: '#',
            skills: ['React', 'Frontend Development']
        },
        {
            name: 'JavaScript',
            issuer: 'HackerRank',
            date: 'Credential ID: 4e52c891b885',
            link: '#',
            skills: ['JavaScript', 'Problem Solving']
        },
        {
            name: 'Introduction to Model Context Protocol',
            issuer: 'Anthropic Education',
            date: 'Apr 2026 · ID: vt5qxvzipcw9',
            link: '#',
            skills: ['MCP', 'AI Tools']
        },
        {
            name: 'Building with the Claude API',
            issuer: 'Anthropic Education',
            date: 'Apr 2026 · ID: encnbz7ewyvg9',
            link: '#',
            skills: ['Claude API', 'AI Development']
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
