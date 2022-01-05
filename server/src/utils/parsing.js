/**
 * Take an object as argument and return the same object parsed as a string
 * without doublequotes on the keys, to use for neo4j requests 
 */
export const objectToString = (object) => {
    const stringObject = JSON.stringify(object);
    const parsedObject = stringObject.replace(/"([^"]+)":/g, "$1:");
    return parsedObject;
};