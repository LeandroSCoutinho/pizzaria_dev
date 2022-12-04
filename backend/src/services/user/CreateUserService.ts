import prismaClient from "../../prisma";
import {hash} from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
  }
  
  class CreateUserService{
    async execute({name, email, password}: UserRequest){
  
     if(!email){
        throw new Error("Favor informar um email correto!");
     }

     const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
     });

     if(userAlreadyExists){
        throw new Error("Este email já está cadastrado");
     }

     const passwordHash = await hash(password, 8);

     const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: passwordHash
        },
        select:{
            id: true,
            name: true,
            email: true
        }
     });
  
      return user;
    }
  }
  
  export { CreateUserService }