import {Project} from "../../models";
import {v4 as uuid} from "uuid";

export default {
    async createProject(request, response) {
        const params = request.body;
        const files = request.files;
        const fileRegex = /(?:\.([^.]+))?$/;

        if (!files) {
            return response.status(401).json({ error: "O campo imagem não pode ficar vazio.", success: false });
        }

        // TODO: Transformar a alocação de imagens em um serviço
        const photo = files.photo;
        const filename = uuid();
        const extension = fileRegex.exec(photo.name)[1];

        console.log(extension);
        if (!extension) {
            return response.status(401).json({ error: "Formato de imagem incorreto", success: false });
        }

        photo.mv(`./uploads/${filename}.${extension}`);

        try {
            let project = new Project({
                name: params.name,
                description: params.description,
                photo: `${filename}.${extension}`,
                url: params.url ? params.url : "",
                highlight: params.highlight ? params.highlight : false,
            });

            await project.save();
            response.json({ success: true });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: "Ocorreu um erro, contate o administrador.",
                success: false
            });
        }
    },
    async getProjects(request, response) {
        const {id} = request.query;

        try {
            if (id) {
                const data = await Project.findOne({
                    _id: id,
                });

                response.json(data);
            } else {
                const data = await Project.find({});
                response.json(data);
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: "Ocorreu um erro, contate o administrador.",
                success: false,
            });
        }
    },
    async getHighlightedProjects(request, response) {
        try {
            const data = await Project.find({highlight: true});
            response.json(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: "Ocorreu um erro, contate o administrador.",
                success: false,
            });
        }
    }
};
