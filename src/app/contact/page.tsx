'use client'
import { useRouter } from "next/navigation";

const Contact = () => {

    const router = useRouter()

    const handleSendContactForm = () => {
        console.log("Formulaire de contact envoyé !");
        // Rediriger l'utilisateur à l'accueil
        router.push("/");
    }

  return (
   <>
   <h1>Contact</h1>
   <button onClick={handleSendContactForm}>Valider le formulaire</button>
   </>
  );
};

export default Contact;
