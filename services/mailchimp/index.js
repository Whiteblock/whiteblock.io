$(function () {
  $('#tomer').click(function () {
    console.log('Clicked on tomer id button')

    $.ajax({
      url: 'https://us18.api.mailchimp.com/3.0/lists/b3fa345e95/',
      // dataType: 'json',
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + ('user' + ':' + '9987ebe9fd73f4c529bba76dc5f974d1-us18'))
      },
      success: function (res) {
        console.log('success', res)
      },
      error: function (error) {
        console.log('error', error)
      }
    })
      .then(function (res) {
        console.log('then', res)
      })
      .done(function () {
        console.log('done')
      })
  })
})

