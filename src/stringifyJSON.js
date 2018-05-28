// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  
  // undefineds
  if (obj === undefined) return undefined;
  // nulls
  else if (obj === null) return "null";
  // strings
  else if (typeof obj === 'string') {
    return '"' + obj.replace(/"/g, '\\"') + '"';
  }
  // numbers
  else if (obj.constructor === Number) return String(obj);
  // booleans
  else if (obj.constructor === Boolean) return obj ? "true" : "false";
  // arrays
  else if (obj.constructor === Array)
    return (
      "[" +
      obj
        .reduce((acc, v) => {
          if (v === undefined) return [...acc, "null"];
          else return [...acc, stringifyJSON(v)];
        }, [])
        .join(",") +
      "]"
    );
  // objects
  else if (obj.constructor === Object) {
    if (obj === {}) {
      return "{}";
    } else {
      return (
        "{" +
        Object.keys(obj)
          .reduce((acc, k) => {
            // check for undefined
            if (obj[k] === undefined) return acc;
            // check for function
            if (typeof obj[k] === 'function') return acc;
            else
              return [...acc, stringifyJSON(k) + ":" + stringifyJSON(obj[k])];
          }, [])
          .join(",") +
        "}"
      );
    }
  } 

  else return "{}";
};
