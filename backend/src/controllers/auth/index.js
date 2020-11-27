import bcrypt from "bcrypt";
import {User} from "../../models";

export default {
    async login(request, response) {
        const params = request.body;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        try {
            let user;
            if (regex.test(params.email)) {
                user = await User.findOne({ email: params.email });
            }

            if (!user) {
                return response.status(401).json({
                    error: "Usuário não encontrado",
                    success: false,
                });
            }

            const matched = await bcrypt.compare(params.password, user.password);
            if (!matched) {
                return response.status(401).json({
                    error: "Senha incorreta",
                    success: false,
                });
            }
            
            const token = user.GenerateToken();
            response.cookie("x-auth-token", token).json({ id: user._id, token, success: true });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async register(request, response) {
        const params = request.body;
        try {
            let user = await User.findOne({ email: params.email });
            if (user) {
                return response.status(400).json({ error: "Email já registrado.", success: false });
            }

            const password = await bcrypt.hash(params.password, Number.parseInt(process.env.SALT));
            user = new User({
                name: params.name,
                email: params.email,
                password,
            });
            await user.save();

            const token = user.GenerateToken();
            console.log("Generated token: " + token);
            response.cookie("x-auth-token", token).json({ id: user._id, token, success: true });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    },
    async getUsers(_, response) {
        try {
            const data = await User.find({});
            response.json(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro, contato o administrador.", success: false });
        }
    }
};