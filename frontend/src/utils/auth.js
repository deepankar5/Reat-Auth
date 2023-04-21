
export function getAuthToken(){
    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const duration = getTokenDuration()
    if(duration < 0 ){
        return 'EXPIRED'
    }
    return token
}

export function clearAuthToken(){
    localStorage.clear('token')
    localStorage.clear('expiration')
}

export function authLoader(){
    return getAuthToken()
}

export function getTokenDuration(){
    const storedExpiration = localStorage.getItem('expiration')
    const expirationDate = new Date(storedExpiration)
    const now = new Date()
    const duration = expirationDate.getTime() - now.getTime()
    return duration
}