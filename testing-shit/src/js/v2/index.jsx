/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable id-length */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { runScript } from '@sogody/experiment-framework';

runScript(() => {
    const collectionsWrapper = document.querySelectorAll('.collection-info__caption-wrapper');
    [...collectionsWrapper].map((wrapper) => wrapper.removeAttribute('href'));
    const videoWrapperSection = document.querySelector('.collection-video-section');
    collectionsWrapper.forEach((button, index) => {
        button.querySelector('.button').addEventListener('click', () => {
            const currentVideo = [...videoWrapperSection.querySelectorAll('.video-wrapper')].find((video) => video.classList.contains('active-video'));
            const videoSelector = videoWrapperSection.querySelector(`.video-wrapper:nth-child(${index + 1})`);
            videoSelector !== currentVideo && (videoSelector.classList.add('active-video'), currentVideo && currentVideo.classList.remove('active-video'));
        });
    });
});
