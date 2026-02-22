import { DataSource } from "typeorm";
import User from "../entities/user.entity";

const dbConfig: DataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'login_portal',
    timezone: '+05:30',
    entities: [User]
});

export default dbConfig;