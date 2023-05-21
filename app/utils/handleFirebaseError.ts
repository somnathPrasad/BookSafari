export const getMessagesFromFirebaseError = (error: any) => {
    const { code } = error;
    let message = '';
    switch (code) {
        case 'auth/invalid-email':
            message = 'Email address is not valid.';
            break;
        case 'auth/user-disabled':
            message = 'User corresponding to the given email has been disabled.';
            break;
        case 'auth/user-not-found':
            message = 'There is no user corresponding to the given email.';
            break;
        case 'auth/wrong-password':
            message = 'Password is invalid for the given email, or the account corresponding to the email does not have a password set.';
            break;
        case 'auth/email-already-in-use':
            message = 'Email already exists.';
            break;
        case 'auth/operation-not-allowed':
            message = 'Email/password accounts are not enabled.';
            break;
        case 'auth/weak-password':
            message = 'Password should be at least 6 characters.';
            break;
        default:
            message = 'An undefined Error happened.';
            break;
    }
    return message;
}