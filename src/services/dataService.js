import { navigation, career, contact, blogs, home } from '../data/index';

export const getNavigation = async () => {
    // Simulate async fetch
    return Promise.resolve(navigation);
};

export const getCareerData = async () => {
    return Promise.resolve(career);
};

export const getContactData = async () => {
    return Promise.resolve(contact);
};

export const getBlogPosts = async () => {
    return Promise.resolve(blogs);
};

export const getHomeData = async () => {
    return Promise.resolve(home);
};
