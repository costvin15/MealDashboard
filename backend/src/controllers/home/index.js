import path from "path";

export default {
    async home(request, response) {
        response.json({
            message: "Telemidia API v1.0",
            success: true,
        });
    },
    async download(request, response) {
        try {
            const filename = path.join(".", __dirname, "uploads", request.params.id);
            response.download(filename);
        } catch (error) {
            console.log(error);
            response.status(401).json({success: false});
        }
    }
};
