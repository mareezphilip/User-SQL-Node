
const resGenerator = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
        apiStatus:apiStatus,
        message:message,
        data
    })
}


module.exports = resGenerator