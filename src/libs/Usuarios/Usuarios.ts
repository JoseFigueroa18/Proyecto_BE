//Interfaz: Es una estructura que define un tipo de dato
export interface IUsuario {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: {};
    ultimoAcceso?:Date;
    created?: Date;
    updated?: Date;
}

//Quick fix
export class Usuarios {
    private usuarios : IUsuario[];
    constructor(){
        this.usuarios = [];
    }
    getAll(){
        return this.usuarios;
    }

    getById(codigo: string){
        const empresaToReturn = this.usuarios.find((emp) =>{
            return emp.codigo === codigo;
        });
        return empresaToReturn;
    }

    add(nuevoUsuario: IUsuario){
        const date = new Date();
        const nuevo: IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            updated: date,
            ultimoAcceso: date
        }
        this.usuarios.push(nuevo);
        return true;
    }

    update(updateUsuario: IUsuario){
        const newUsuarios: IUsuario[] = this.usuarios.map((emp)=>{
            if (emp.codigo === updateUsuario.codigo){
                return {...emp, ...updateUsuario, updated: new Date()};
            }
            return emp;
        });
        this.usuarios = newUsuarios;
        return true;
    }

    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((emp) => {
            return emp.codigo === codigo;
        });
        if(usuarioToDelete){
            const newUsuarios: IUsuario[] = this.usuarios.filter((emp) =>{
                return emp.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;

    }
}
