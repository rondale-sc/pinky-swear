import Promise from './promise';

export default function (value) {
  return new Promise(function(resolve, reject) {
    return resolve(value);
  });
};
