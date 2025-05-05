
import { UserD } from '../models/model.user.domain';
import { UserE } from '../entities/model.user.entity';
import { UserOperations } from './user.operations';
import { UserDto } from '../dtos/user.dto';
import { Db1 } from '../../../core/adapter/db1';
import { UserPort } from '../ports/user.port';
import { BaseAdapter } from '../../../core/adapter/base.adapter';
const db = new Db1();

export class UserAdapter extends BaseAdapter<UserE, UserD> implements UserPort{
    constructor() {
        super(new UserOperations(db), new UserDto());
    }

    findByEmail(email: string): Promise<UserD> {
        throw new Error('Method not implemented.');
    }
    findByEmailAndPassword(email: string, password: string): Promise<UserD> {
        throw new Error('Method not implemented.');
    }
    existsByEmail(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}



    

