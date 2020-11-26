import express from "express";
import jwt from "jsonwebtoken";

import {
    Home,
    Auth,
    Peoples,
    Partners,
    Projects,
} from "./controllers";

const routes = express.Router();
const VerifyJWT = (request, response, next) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        return response.status(401).send({
            error: 'Nenhum token foi disponibilizado',
            success: false,
        });
    }
    
    const token = authorization.split(" ")[1];

    if (!token) {
        return response.status(401).send({
            error: 'Nenhum token foi disponibilizado',
            success: false,
        });
    }

    jwt.verify(token, process.env.PRIVATEKEY, (error, decoded) => {
        if (error) {
            console.log(error);
            return response.status(500).send({
                error: 'Não foi possível autenticar o token informado.',
                success: false,
            });
        }

        request.userid = decoded._id;
        next();
    });
};

routes.get("/", Home.home);
routes.get("/download/:id", Home.download);

routes.post("/auth/login", Auth.login);
routes.post("/auth/register", VerifyJWT, Auth.register);
routes.get("/users/", VerifyJWT, Auth.getUsers);

routes.post("/peoples/", VerifyJWT, Peoples.createPeople);
routes.get("/peoples/", Peoples.getPeoples);
routes.delete("/peoples/:id", VerifyJWT, Peoples.deletePeople);

routes.post("/peoples/type/", VerifyJWT, Peoples.createType);
routes.get("/peoples/type/", Peoples.getTypes);
routes.delete("/peoples/type/:id", VerifyJWT, Peoples.deleteType);

routes.post("/partners/", VerifyJWT, Partners.createPartner);
routes.put("/partners/", VerifyJWT, Partners.updatePartner);
routes.get("/partners/", Partners.getPartners);
routes.delete("/partners/:id", VerifyJWT, Partners.deletePartner);

routes.post("/partners/type", VerifyJWT, Partners.createPartnerCategory);
routes.get("/partners/type", Partners.getPartnerType);
routes.delete("/partners/type/:id", VerifyJWT, Partners.deletePartnerType);

routes.post("/projects/", VerifyJWT, Projects.createProject);
routes.get("/projects/", Projects.getProjects);
routes.get("/projects/highlighted", Projects.getHighlightedProjects);

export default routes;
