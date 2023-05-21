import { Modal, View } from "react-native"
import { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

interface AuthModalProps {
    visible: boolean;
    onRequestClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false);

    return (
        <Modal animationType="slide" transparent visible={props.visible} onRequestClose={props.onRequestClose}>

            <View style={{ backgroundColor: "rgba(0,0,0,0.8)" }} className="flex-1 items-center justify-center">
                {showSignUp ? 
                <SignUp onSignUp={props.onRequestClose} setShowSignUp={setShowSignUp} /> : 
                <Login onLogin={props.onRequestClose} setShowSignUp={setShowSignUp} />}

            </View>

        </Modal>
    )
}


