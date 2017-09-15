function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatFace(faces) {
  if (!faces || faces.length==0){
    return '未检测到人脸'
  }
  const genders = {
    'Male':'帅哥',
    'Female':'美女'
  }
  const glass = {
    'None':'',
    'Normal':'戴着眼镜的',
    'Dark':'戴着墨镜的'
  }
  console.log('faces.length='+faces.length)
  var tips = ''
  for (var i=0; i <faces.length; i++){
    var face = faces[i]
    var attr = face.attributes
    if (!attr){
      continue
    }
    var age = attr.age.value
    console.log(age)
    console.log(age>21)   
    var gender = attr.gender.value
    console.log(gender=='Female')
    if (age > 21 && gender=='Female'){
      age = 21
    }
    var roll_angle = Math.abs(Math.round(attr.headpose.roll_angle))
    console.log(attr)
    //var tip = '一位'+age+'岁的'+glass[attr.glass.value]+genders[attr.gender.value]+'面带'+attr.smile.value + '分的笑容'+' \n '
    var tip = '一位'+age+'岁的'+genders[attr.gender.value]+'面带'+attr.smile.value + '分的笑容'+'歪头'+roll_angle+'度'
    tips += tip
  }
  return tips
}

module.exports = {
  formatTime: formatTime,
  formatFace: formatFace
}
