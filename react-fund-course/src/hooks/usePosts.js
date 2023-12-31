import React, { useMemo } from 'react';

export const useSortedPosts = function (posts, sort) {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = function (posts, sort, query) {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchPosts = useMemo(() => {
        console.log('usePosts::useMemo');
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])
    console.log('usePosts');

    return sortedAndSearchPosts;
}