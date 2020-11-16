import { User } from '../models/user.model';

export interface LoadUsers {
    total_regs: number;
    users: User[];
}