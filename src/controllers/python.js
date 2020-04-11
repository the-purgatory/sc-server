const _PATHS = {
  index: 'index.py'
};

const PythonMiddleware = (reqData, cb) => {
  // const py_req_obj = {
  //   method_name: ...,
  //   payload: ...
  // }
  const method_name = reqData.method_name || 'index';
  const { payload } = reqData;

  const { spawn } = require('child_process');
  const process = spawn('python', [`./_nlp/${_PATHS[method_name]}`, payload]);

  process.stdout.on('end', function () {});
  process.stderr.on('data', function (data) {
    cb({ data: reqData, python: JSON.parse(data.toString()) });
  });

  let dataString = '';

  /* Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString. */
  process.stdout.on('data', function (data) {
    dataString += data.toString();
  });
  /* Once the stream is done (on 'end') we want to simply log the received data to the console. */
  process.stdout.on('end', function () {
    cb({ data: reqData, python: JSON.parse(dataString) });
  });
};

module.exports = PythonMiddleware;
