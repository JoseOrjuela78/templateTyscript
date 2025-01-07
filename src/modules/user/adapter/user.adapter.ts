import { User } from '../model/user';
import { UserPort } from '../port/user.port';

export class UserAdapter implements UserPort{
    create(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    get(userId: number): Promise<User> {
        throw new Error('Method not implemented.');
    }
    list(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    findByEmail(email: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    findByEmailAndPassword(email: string, password: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    existByEmail(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getByPage(page: number, pageSize: number): Promise<User[]> {
        throw new Error('Method not implemented.');
    }

}