const button = $('.button');
var input = $('#search-input');
const lyricsContainer = $('.lyrics-container');
const lyricsList = $('.lyrics-list');
const endPoint = 'https://api.lyrics.ovh/suggest/';

button.click(() => {
    $.ajax({
        url: `${endPoint}/${input.val()}`,
        success: resp => {
            $.each(resp.data, (index, value) => {
                lyricsList.append(`
               <li class="list">
                <span><strong>${value.artist.name}</strong> - ${value.title}</span>
                <button class="btn" data-artist="${value.artist.name}" data-songtitle="${value.title}">Get Lyrics</button>
              </li>
                `);
            });
            $('html, body').animate(
                {
                    scrollTop: $('#results').offset().top - 60,
                },
                1500
            );
        },
    });
});
