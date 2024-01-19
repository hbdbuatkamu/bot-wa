const fs = require('fs')
const toMs = require('ms')

/**
 * Add gold user.
 * @param {String} userId 
 * @param {String} expired 
 * @param {Object} _dir 
 */
const addgoldUser = (userId, expired, _dir) => {
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
    fs.writeFileSync('./src/gold.json', JSON.stringify(_dir, null, 2))
}

/**
 * Get gold user position.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getgoldPosition = (userId, _dir) => {
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
 * Get gold user expire.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getgoldExpired = (userId, _dir) => {
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
 * Check user is gold.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkgoldUser = (userId, _dir) => {
    let status = false;
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true;
        }
    });
    return status;
};

/**
 * Constantly checking gold.
 * @param {Object} _dir 
 */
const goldexpiredCheck = (conn, _dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`gold expired: ${_dir[position].id}`)
            let txt = `gold Expired, Terimakasih Sudah Berlangganan`
            conn.sendMessage(_dir[position].id, { text: txt })
            _dir.splice(position, 1)
            fs.writeFileSync('./src/gold.json', JSON.stringify(_dir, null, 2))
        }
    }, 1000)
}

/**
 * Get all gold user ID.
 * @param {Object} _dir 
 * @returns {String[]}
 */
const getAllgoldUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

module.exports = {
    addgoldUser,
    getgoldExpired,
    getgoldPosition,
    goldexpiredCheck,
    checkgoldUser,
    getAllgoldUser
}
