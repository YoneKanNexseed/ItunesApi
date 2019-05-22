let template = null;

$(function() {

  $.get("../../card.html", function(temp) {
    template = $(temp);
  })

  $('#search-btn').on('click', function() {
    // 検索ボタンがクリックされたら

    // 検索ワードを取得する
    let searchWord = $('#search-word').val();

    // メディア設定取得
    let media = $('#media').text();

    // itunesに曲の検索をしに行く(Ajax)
    $.ajax({
      // データの通信をするところ
      url: 'https://itunes.apple.com/search', // 通信先URL
      type: 'GET',  // GET送信 or POST送信
      dataType: 'jsonp', // 検索結果の形式
      data: {
        term: searchWord,
        country: 'jp',
        media: media,
      }
    }).done( (data) => {
      console.log(data);
      // 通信成功した時
      $('#result').empty();

      if (data.results.length == 0) {
        $('#result').append($('<p>0件</p>'));
        return;
      }

      for (item of data.results) {
        let card = template.clone();
        card.find('img').attr('src', item.artworkUrl100);
        card.find('h5').text(item.collectionName);
        card.find('a').attr('href', item.collectionViewUrl);
        
        $('#result').append(card);
      }

    }).fail((error) => {
      // 通信失敗した時
      console.log(error);
    })
  });

  $('.dropdown-item').on('click', function() {
    let value = $(this).text();
    $('#media').text(value);
  });
})