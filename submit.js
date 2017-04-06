/* globals $ FileReader */

$('form').on('submit', function (e) {
  e.preventDefault()

  var reader = new FileReader()
  var file = $('#resume')[0]

  if (!file.files.length) {
    console.log('no file uploaded')
    return false
  }

  reader.onload = function () {
    var data = reader.result
    var base64 = data.replace(/^[^,]*,/, '')
    var info = {
      name: 'Andrew',
      age: 26,
      resume: base64 // either leave this `basae64` or make it `data` if you want to leave the `data:application/pdf;base64,` at the start
    }

    $.ajax({
      url: 'http://ec2-52-221-213-69.ap-southeast-1.compute.amazonaws.com/797824',
      type: 'POST',
      dataType: 'JSON',
      data: info,
      success: function (response) {
        console.log(response)
      }
    })
  }

  reader.readAsDataURL(file.files[0])
})
