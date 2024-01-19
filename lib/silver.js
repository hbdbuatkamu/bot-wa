const fs = require('fs')
const toMs = require('ms')

/**
 * Add silver user.
 * @param {String} userId 
 * @param {String} expired 
 * @param {Object} _dir 
 */
const addsilverUser = (userId, expired, _dir) => {
    if (expired === undefined) {
        expired = 'PERMANENT'
    } else {
        expired = expired
    }
    
    let expired_at = 'PERMANENT'
    
    if (expired === 'PERMANENT') {
        expired_at = 'PERMANENT'
    } else {
        expired_at = Date.now() + toMs(expired)
    }

    const obj = { id: userId, expired: expired_at }
    _dir.push(obj)
    fs.writeFileSync('./src/silver.json', JSON.stringify(_dir, null, 2))
}

/**
 * Get silver user position.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getsilverPosition = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

/**
 * Get silver user expire.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getsilverExpired = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Check user is silver.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checksilverUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

/**
 * Constantly checking silver.
 * @param {Object} _dir 
 */
const silverexpiredCheck = (conn, _dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`silver expired: ${_dir[position].id}`)
            let txt = `silver Expired, Terimakasih Sudah Berlangganan`
            conn.sendMessage(_dir[position].id, { text: txt })
            _dir.splice(position, 1)
            fs.writeFileSync('./src/silver.json', JSON.stringify(_dir, null, 2))
        }
    }, 1000)
}

/**
 * Get all silver user ID.
 * @param {Object} _dir 
 * @returns {String[]}
 */
const getAllsilverUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

module.exports = {
    addsilverUser,
    getsilverExpired,
    getsilverPosition,
    silverexpiredCheck,
    checksilverUser,
    getAllsilverUser
}
