import { Schema, model, Model } from "mongoose";

const projectsSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        // required: [true, "The title is required"],
    },
    description: {
        type: String,
        default: "",
    },
    technologies: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        default: "",
    },
    demoUrl: {
        type: String,
        default: "",
    },
    repoUrl: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: "",
    }
});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Projects: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Projects = model("projects");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Projects = model("projects", projectsSchema);
}

export default Projects;