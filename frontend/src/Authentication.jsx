class MyToken {
    constructor(token) {
        this.token = token;
    }

    get role() {
        const decodedToken = this.decodedTokenRole;
        return decodedToken ? decodedToken.user_type : null;
    }

    get username() {
        const decodedToken = this.decodedTokenUsername;
        return decodedToken ? decodedToken.username : null;
    }

    get decodedTokenRole() {
        console.log(this.decodeTokenPart(1));
        return this.decodeTokenPart(1); 
    }

    get decodedTokenUsername() {
        console.log(this.decodeTokenPart(1));
        return this.decodeTokenPart(1);
    }

    decodeTokenPart(index) {
        const part = this.token.split('.')[index];
        return part ? JSON.parse(atob(part)) : null;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    else {
        window.location.href = '/'; 
        console.log("ERROR TOKEN") 
    }
}

export const getRole = () => {
    const tokenString = getCookie('token');
    const token = new MyToken(tokenString);
    console.log(token.role);
    return token.role;
};

export const getUsername = () => {
    const tokenString = getCookie('token');
    const token = new MyToken(tokenString);
    return token.username;
};
