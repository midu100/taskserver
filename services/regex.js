const isValidEmail = (email)=>{
    const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
}

const isValidPassword = (password)=>{
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    return passwordRegex.test(password);
}

module.exports={isValidEmail,isValidPassword}