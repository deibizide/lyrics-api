const button = $('button');
const input = $('.search');
const endPoint = 'https://api.lyrics.ovh/suggest/';

button.click(() => {
    $.ajax({
        url: `${endPoint}/${input.val()}`,
        success: resp => {
            $.each(resp, (i, data) => {
                console.log(data);
            });
        },
    });
});
