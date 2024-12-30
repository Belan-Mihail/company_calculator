import { prop, getModelForClass, pre, modelOptions  } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@modelOptions({ schemaOptions: {timestamps: true}})
@pre<Admin>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

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