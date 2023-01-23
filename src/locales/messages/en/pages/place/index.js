const messages = {
    pageTitle: 'View Location',
    buttons: {
        map: 'View the location on the map',
        favorite: {
            make: 'Add to Favorites',
            undo: 'Remove from Favorites'
        },
        share: 'Share'
    },
    visitors: {
        score: '0 visitors | 1 visitor | {n} visitors',
        describe: 'This is the number of our users who have visited this location.'
    },
    reviews: {
        text: '(no reviews) | (1 review) | ({n} reviews)',
        title: 'Reviews',
        description: 'Because your opinion matters!',
        stars: '1 star | {n} stars',
        addReview: 'Tell your story'
    },
    weather: {
        cloudy: 'cloudy {temperature} {unit}'
    },
    unesco: {
        label: 'UNESCO',
        title: 'Тhis landmark is part of the UNESCO Cultural Heritage.'
    },
    photography: {
        author: 'Photograph: {author}',
        more: 'Show all photos'
    },
    contents: {
        tableOfContents: 'Contents',
        copyrights:
            'All text content on this page is provided completely voluntarily by the users of the site through our <a href="{repo}" target="blank">GitHub repository</a>, and we are not responsible for the copyright on it.',
        author: 'Author of the content is | Authors of the content are'
    },
    audio: {
        section: 'Section: "{section}"',
        describe: 'Audio for section from',
        playAudio: 'Play audio track from this section',
        controls: {
            hide: 'Collapse Player',
            show: 'Expand Player',
            skipBack: 'Previous Track',
            skipForward: 'Next Track',
            play: 'Play',
            pause: 'Pause',
            volume: 'Adjust Volume'
        }
    }
}

export default messages
