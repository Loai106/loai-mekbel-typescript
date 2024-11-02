

class ValidationError extends Error {
    errorCode: number = 400 ;

    constructor( message:string ,private property:string){
        super(message);
    }

    serializeErrors(){
        return [{message: this.message , property: this.property,errorCode:this.errorCode}]
    }


}

export default ValidationError;