import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "http://localhost:5173", // Cambia según el puerto del frontend
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    });

    app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || "127.0.0.1";

    await app.listen(port, host);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
