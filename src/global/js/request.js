import axios from 'axios'

export default function (options) {
  return new Promise((resolve, reject) => {
    axios(options).then(response => {
      const { status, data: result } = response

      if (status === 200) {
        const { success, data, message } = result

        if (success) {
          resolve(data)
        } else {
          reject(new Error(message))
        }
      } else {
        reject(new Error('网络异常，请稍后再试'))
      }
    }).catch(err => {
      reject(err)
    })
  })
}
