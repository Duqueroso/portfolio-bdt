import { Schema, model, Model } from "mongoose";

const contactSchema = new Schema({
    fullname: {
        type: String,
        // required: [true, "The name is required"],
    },
    email: {
        type: String,
        // required: [true, "The email is required"],
    },
    message: {
        type: String,
        default: "",
    },


});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Contact: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Contact = model("contact");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Contact = model("contact", contactSchema);
}

export default Contact;