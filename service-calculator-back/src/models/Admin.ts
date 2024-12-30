import { prop, getModelForClass } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

class Admin {
    @prop({required: true, unique: true})
    username!: string

    @prop({required: true})
    password!: string

    // Method for comparing password
    async comparePassword(inputPassword:string):Promise<boolean> {
        return bcrypt.compare(inputPassword, this.password)
    }
}

const AdminModel = getModelForClass(Admin)
export default AdminModel