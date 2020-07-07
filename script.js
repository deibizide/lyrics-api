const button = $('.button');
const input = $('#search-input');
const lyricsContainer = $('.lyrics-container');
const lyric = $('.lyric');
const endPoint = 'https://api.lyrics.ovh/';
const form = $('.form');

// Search by song or artist
function getSongs() {
    $.ajax({
        url: `${endPoint}/suggest/${input.val()}`,
        success: resp => {
            showData(resp);
            getLyrics();
        },
    });
}
// Get prev and next results
function getMoreSongs(url) {
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/${url}`,
        success: resp => {
            showData(resp);
            getLyrics();
        },
    });
}

// Loader
$(document)
    .ajaxStart(function () {
        $('.loadingDiv').show();
        $('.lyrics-list').hide();
    })
    .ajaxStop(function () {
        $('.loadingDiv').hide();
        $('.lyrics-list').show();
    });

function showData(resp) {
    // Create Artist/Lyrics container
    lyricsContainer.html(`
    <div class="container">
        <div class="sub-container">
            <div class="loadingDiv text-center"> 
                <p class="m-0">Loading...</p>
                <div class="spinner-grow text-warning" role="status"></div>
            </div>
            <ul class="lyrics-list" ></ul>
            <div class="next"></div>
        </div>
    </div>
    `);
    // Artist/Lyrics results
    $.each(resp.data, (index, value) => {
        $('.lyrics-list').append(`
            <li class="list d-flex justify-content-between align-items-center">
                <span><strong>${value.artist.name}</strong> - ${value.title}</span>
                <button class="btn button button-get-lyrics" data-artist="${value.artist.name}" data-title="${value.title}">Get Lyrics</button>
            </li>
        `);
    });
    //Create Button - prev and next results
    $('.next').html(`
        <div class="d-flex justify-content-center">
            ${resp.prev ? `<button class="btn button prev-button mr-3">Prev</button>` : ''}
            ${resp.next ? `<button class="btn button next-button">Next</button>` : ''}
        </div>
            `);
    // Get prev and next results
    $('.next-button').click(() => {
        getMoreSongs(resp.next);
    });
    $('.prev-button').click(() => {
        getMoreSongs(resp.prev);
    });
    // SmoothScroll animation
    $('html, body').animate(
        {
            scrollTop: $('#results').offset().top - 60,
        },
        1500
    );
}

// Find Lyrics
function getLyrics() {
    $('.button-get-lyrics').click(e => {
        const { artist, title } = e.target.dataset;
        console.log({ artist, title });

        $.ajax({
            url: `${endPoint}/v1/${artist}/${title}`,
            success: resp => {
                const lyrics = resp.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
                lyric.html(`
                    <div class="container song-lyric" id="lyrics-results">
                        <h2><strong>${artist}</strong> - ${title}</h2>
                        <span>${lyrics}</span>
                    </div>
                    `);
            },
        });
        $('html, body').animate(
            {
                scrollTop: $('#lyrics-results').offset().top - 60,
            },
            1500
        );
    });
}

form.submit(e => {
    e.preventDefault();
    getSongs();
});

button.click(() => {
    getSongs();
});
