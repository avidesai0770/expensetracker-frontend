const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3-20 characters

export { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX };