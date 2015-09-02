import Promise from './promise';

export default function(reason) {
  return new Promise(function(resolve, reject) {
    return reject(reason);
  });
};
