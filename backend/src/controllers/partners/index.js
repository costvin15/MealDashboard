import {Partner} from "../../models";
import {v4 as uuid} from "uuid";
import fs from "fs";

export default {
    async createPartner(request, response) {
        const params = request.body;
        const files = request.files;
        const fileRegex = /(?:\.([^.]+))?$/;

        const photo = files.photo;
        const filename = uuid();
        const extension = fileRegex.exec(photo.name)[1];

        if (!extension) {
            return response.status(401).json({ error: "Formato de imagem incorreto", success: false });
        }

        photo.mv(`./uploads/${filename}.${extension}`);

        try {
            let partner = new Partner.Partner({
                name: params.name,
                photo: `${filename}.${extension}`,
                type: params.type,
                url: params.url ? params.url : "",
            });

            await partner.save();

            response.json({ success: true });
        } catch (error) {    
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contate o administrador.", success: false });
        }
    },
    async updatePartner(request, response) {
        const params = request.body;
        const files = request.files;
        const fileRegex = /(?:\.([^.]+))?$/;
        let filename = "";

        const {id, name, type, url, highlight} = params;
        try {
            const partner = await Partner.Partner.findOne({_id: id});
            if (!partner) {
                throw "ID Inválido";
            }

            if (files) {
                const photo = files.photo;
                filename = uuid();
                const extension = fileRegex.exec(photo.name)[1];

                if (!extension) {
                    return response.status(401).json({ error: "Formato de imagem incorreto", success: false });
                }
                
                if (partner.photo) {
                    fs.unlinkSync(`./uploads/${partner.photo}`);
                }
                photo.mv(`./uploads/${filename}.${extension}`);
                filename = `${filename}.${extension}`;
            }

            await Partner.Partner.updateOne({_id: id}, {$set: {
                name: name ? name : partner.name,
                type: type ? type : partner.type,
                url: url ? url : partner.url,
                photo: filename ? filename : partner.photo,
                highlight: highlight ? highlight : false,
            }});

            response.json({success: true});
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async deletePartner(request, response) {
        const params = request.params;

        try {
            const partner = await Partner.Partner.findOne({_id: params.id});

            if (!partner) {
                throw "Parceiro incorreto.";
            }

            fs.unlinkSync(`./uploads/${partner.photo}`);
            await partner.deleteOne();
            response.json({success: true});
        } catch (error) {
            console.error(error);
            response.status(500).json({
                error,
                success: false,
            });
        }
    },
    async getPartners(request, response) {
        const {id} = request.query;

        try {
            if (id) {
                const data = await Partner.Partner.findOne({
                    _id: id,
                });
                response.json(data);
            } else {
                const data = await Partner.Partner.find({});
                response.json(data);
            }
        } catch (error) {    
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async createPartnerCategory(request, response) {
        const params = request.body;

        try {
            let partnerCategory = new Partner.Type({
                title: params.title,
            });

            await partnerCategory.save();
         
            response.json({ success: true });
        } catch (error) {    
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async getPartnerType(_, response) {
        try {
            const data = await Partner.Type.find({});
            response.json(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async deletePartnerType(request, response) {
        const params = request.params;

        try {
            const type = Partner.Type.findOne({_id: params.id});

            if (!type) {
                throw "Categoria incorreta.";
            }

            await type.deleteOne();

            response.json({
                success: true,
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                error,
                success: false,
            });
        }
    }
}