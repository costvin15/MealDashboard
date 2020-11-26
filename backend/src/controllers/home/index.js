import path from "path";

export default {
    async home(request, response) {
        response.json({
            message: "Meal dashboard API v1.0",
            success: true,
        });
    },
};
