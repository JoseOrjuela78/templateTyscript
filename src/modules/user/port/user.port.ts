import { User } from '../model/user';

export type UserPort = {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(userId: number): Promise<void>;
    get(userId: number): Promise<User>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findByEmailAndPassword(email: string, password: string): Promise<User>;
    existByEmail(email: string): Promise<boolean>;
    getByPage(page: number, pageSize: number): Promise<User[]>;
}