export const isEnvAPI = (): boolean => {
    const env =  process.env.ENV_RUN;
    if (env === undefined) return false;
    else if (env === 'API') return true;
    else return false;
}