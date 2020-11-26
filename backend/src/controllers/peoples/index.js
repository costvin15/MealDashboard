import {People} from "../../models";
import {v4 as uuid} from "uuid";
import fs from "fs";

export default {
    async createPeople(request, response) {
        const params = request.body;
        const files = request.files;
        const fileRegex = /(?:\.([^.]+))?$/;
        const profilePhoto = files.photo;
        const profilePhotoName = uuid();
        const profilePhotoExtension = fileRegex.exec(profilePhoto.name)[1];

        if (!profilePhotoExtension) {
            return response.status(401).json({ error: "Formato de imagem incorreto.", success: false });
        }

        profilePhoto.mv(`./uploads/${profilePhotoName}.${profilePhotoExtension}`);

        try {
            const people = new People.People({
                name: params.name,
                description: params.description,
                photo: `${profilePhotoName}.${profilePhotoExtension}`,
                type: params.type,
                lattes: params.lattes ? params.lattes : "",
                git: params.git ? params.git : "",
            });
            await people.save();

            response.json({ success: true, });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async deletePeople(request, response) {
        const params = request.params;
        try {
            const people = await People.People.findOne({_id: params.id});
            
            if (!people) {
                throw "Usuário incorreto";
            }

            fs.unlinkSync(`./uploads/${people.photo}`);
            const result = await People.People.deleteOne({_id: params.id});
            
            response.json({
                success: result.deletedCount === 1,
            });
        } catch (error) {
            response.status(500).json({
                error,
                success: false,
            });
        }
    },
    async getPeoples(_, response) {
        try {
            const data = await People.People.find({});
            response.json(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async createType(request, response) {
        const params = request.body;

        try {
            const type = new People.PeopleType({
                name: params.name,
            });
            await type.save();

            response.json({ success: true, });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async deleteType(request, response) {
        const params = request.params;

        try {
            const type = await People.PeopleType.findOne({_id: params.id});

            if (!type) {
                throw "Categoria incorreta.";
            }

            const result = await People.PeopleType.deleteOne({_id: params.id});
            response.json({
                success: result.deletedCount === 1,
            });
        } catch (error) {
            response.status(500).json({
                error,
                success: true,
            });
        }
    },
    async getTypes(_, response) {
        try {
            const data = await People.PeopleType.find({});
            response.json(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
};
