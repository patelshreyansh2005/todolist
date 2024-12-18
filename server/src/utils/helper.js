export const jsonGenerate = (statusCode, message, data = null) => {
    return { statusCode: statusCode, message: message, data: data };
}