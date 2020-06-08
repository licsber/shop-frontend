var axios = require('axios')

function getAllCategories () {
  return new Promise(
    (resolve, reject) => {
      axios.get('/categories')
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              resolve(res.data.data)
            } else {
              reject(new Error(res.data.msg))
            }
          }
        })
        .catch(fail => {
          reject(new Error('请求后端获取类别列表失败'))
        })
    })
}

export default {getAllCategories}
