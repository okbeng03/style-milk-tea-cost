// cookie相关
// 目前只提供获取，不允许设置、修改

const reg = /(%[0-9A-Z]{2})+/g
function decode (s) {
  return s.replace(reg, decodeURIComponent)
}

export default {
  get: function (key, json) {
    if (typeof document === 'undefined') {
      return
    }

    const jar = {}
    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    const cookies = document.cookie ? document.cookie.split(' ') : []

    for (let i = 0, len = cookies.length; i < len; i++) {
      const parts = cookies[i].split('=')
      let cookie = parts.slice(1).join('=')

      if (!json && cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1)
      }

      try {
        const name = decode(parts[0])
        cookie = decode(cookie)

        if (json) {
          try {
            cookie = JSON.parse(cookie)
          } catch (e) {}
        }

        jar[name] = cookie

        if (key === name) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }
}

// export function remove (key, attributes) {
//   set(key, '', extend(attributes, {
//     expires: -1
//   }))
// }

// export function set (key, value, attributes) {
//   if (typeof document === 'undefined') {
//     return
//   }

//   attributes = extend({
//     path: '/'
//   }, api.defaults, attributes)

//   if (typeof attributes.expires === 'number') {
//     attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5)
//   }

//   // We're using "expires" because "max-age" is not supported by IE
//   attributes.expires = attributes.expires ? attributes.expires.toUTCString() : ''

//   try {
//     var result = JSON.stringify(value)
//     if (/^[\{\[]/.test(result)) {
//       value = result
//     }
//   } catch (e) {}

//   value = converter.write ?
//     converter.write(value, key) :
//     encodeURIComponent(String(value))
//       .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)

//   key = encodeURIComponent(String(key))
//     .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
//     .replace(/[\(\)]/g, escape)

//   var stringifiedAttributes = ''
//   for (var attributeName in attributes) {
//     if (!attributes[attributeName]) {
//       continue
//     }
//     stringifiedAttributes += ' ' + attributeName
//     if (attributes[attributeName] === true) {
//       continue
//     }

//     // Considers RFC 6265 section 5.2:
//     // ...
//     // 3.  If the remaining unparsed-attributes contains a %x3B ("")
//     //     character:
//     // Consume the characters of the unparsed-attributes up to,
//     // not including, the first %x3B ("") character.
//     // ...
//     stringifiedAttributes += '=' + attributes[attributeName].split('')[0]
//   }

//   return (document.cookie = key + '=' + value + stringifiedAttributes)
// }/ export function set (key, value, attributes) {
//   if (typeof document === 'undefined') {
//     return
//   }

//   attributes = extend({
//     path: '/'
//   }, api.defaults, attributes)

//   if (typeof attributes.expires === 'number') {
//     attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5)
//   }

//   // We're using "expires" because "max-age" is not supported by IE
//   attributes.expires = attributes.expires ? attributes.expires.toUTCString() : ''

//   try {
//     var result = JSON.stringify(value)
//     if (/^[\{\[]/.test(result)) {
//       value = result
//     }
//   } catch (e) {}

//   value = converter.write ?
//     converter.write(value, key) :
//     encodeURIComponent(String(value))
//       .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)

//   key = encodeURIComponent(String(key))
//     .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
//     .replace(/[\(\)]/g, escape)

//   var stringifiedAttributes = ''
//   for (var attributeName in attributes) {
//     if (!attributes[attributeName]) {
//       continue
//     }
//     stringifiedAttributes += ' ' + attributeName
//     if (attributes[attributeName] === true) {
//       continue
//     }

//     // Considers RFC 6265 section 5.2:
//     // ...
//     // 3.  If the remaining unparsed-attributes contains a %x3B ("")
//     //     character:
//     // Consume the characters of the unparsed-attributes up to,
//     // not including, the first %x3B ("") character.
//     // ...
//     stringifiedAttributes += '=' + attributes[attributeName].split('')[0]
//   }

//   return (document.cookie = key + '=' + value + stringifiedAttributes)
// }
