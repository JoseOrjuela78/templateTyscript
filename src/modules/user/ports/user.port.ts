import { UserD } from '../models/model.user.domain';
import { BasePort } from '../../../core/port/base.port';

export type UserPort = BasePort<UserD> & {
    login(user: UserD): Promise<UserD>;
    findByEmail(email: string): Promise<UserD>;
    findByEmailAndPassword(email: string, password: string): Promise<UserD>;
    existsByEmail(email: string): Promise<boolean>;
};