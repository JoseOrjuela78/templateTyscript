import { envs } from '../config/environment-vars';
import { Bootstrap } from './bootstrap';
import { DataSource } from 'typeorm';

export class DatabaseBootstrap implements Bootstrap {

    private static appDataSource: DataSource;


    initialize(): Promise<DataSource> {
        const dbConfig = envs.db;
        const appDataSource = new DataSource({
            type: 'mysql',
            ...dbConfig
        });

        DatabaseBootstrap.appDataSource = appDataSource;
        const init = appDataSource.initialize();
        init.then(() => console.log(`Database initialized running on ${dbConfig.host}:${dbConfig.port}`));
        return init;
    }

    static get dataSource(): DataSource{
        return DatabaseBootstrap.appDataSource;
    }

}