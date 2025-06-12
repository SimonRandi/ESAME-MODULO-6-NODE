const logger = async (request, response, next) => {
  const { url, ip, method } = request;

  console.log(
    `Richiesta di tipo ${method} effetuata all'indirizzo ${url} da ip ${ip}`
  );
  next();
};

module.exports = logger;
