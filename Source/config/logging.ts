const getTimeStamp = (): string =>{
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if(object){
        console.log('[${getTimeStamp()}] [INFO] [${namespace}] ${message}', object);
    }
    else{
        console.log('[${getTimeStamp()}] [INFO] [${namespace}] ${message}');
    }
}

const warn = (namespace: string, message: string, object?: any) => {
    if(object){
        console.log('[${getTimeStamp()}] [WARN] [${namespace}] ${message}', object);
    }
    else{
        console.log('[${getTimeStamp()}] [WARN] [${namespace}] ${message}');
    }
}

const error = (namespace: string, message: string, object?: any) => {
    if(object){
        console.log('[${getTimeStamp()}] [error] [${namespace}] ${message}', object);
    }
    else{
        console.log('[${getTimeStamp()}] [error] [${namespace}] ${message}');
    }
}

const debug = (namespace: string, message: string, object?: any) => {
    if(object){
        console.log('[${getTimeStamp()}] [debug] [${namespace}] ${message}', object);
    }
    else{
        console.log('[${getTimeStamp()}] [debug] [${namespace}] ${message}');
    }
}

export default{
    info,
    warn,
    error,
    debug
}