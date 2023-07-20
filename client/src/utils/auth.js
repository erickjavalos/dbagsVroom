// import decode from 'jwt-decode';

class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

  loggedIn() {
    const token = this.getToken();
    const expiration = this.getExpiration();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(expiration);
    // return true
  }

  isTokenExpired(expiration) {
    // Decode the token to get its expiration time that was set by the server
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (expiration < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('expiration');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    // return false;
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  getExpiration() {
    return localStorage.getItem('expiration');
  }

  login(idToken,expiration) {
    localStorage.setItem("expiration", expiration)
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiration');
    window.location.reload();
  }
}

export default new AuthService();