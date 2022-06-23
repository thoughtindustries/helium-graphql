module.exports = function processor({
  // The type should always be provided
  type,
  // If the thing is a field or the argument on a field, field will be present
  field,
  // If the thing is an argument on a field, argument will be present
  arg,
  // If the thing being processed is an inputField on an input type, inputField will be present
  inputField,
  // This will be an object containing (at least) the 'kind' and 'name' properties of the "underlying type"
  // of the thing being processed. "Underlying type" meaning whatever is at the bottom of any "LIST" and
  // "NON_NULL" nesting. If the thing being processed is actually a Type, this object will be the entire
  // Type.
  //
  // Eg: [String] => { kind: 'SCALAR', name: 'String' }
  underlyingType,
  // Is the thing required or not? Eg: String! or [String]! => true
  // eslint-disable-next-line no-unused-vars
  isRequired,
  // Is the thing an array/list? Eg: [String] => true
  isArray,
  // Are the items in the array/list required? Eg: [String!] => true
  // eslint-disable-next-line no-unused-vars
  itemsRequired
}) {
  if (field) {
    if (
      [
        'courseGroup',
        'learningPathId',
        'learningPath',
        'courseId',
        'course',
        'licenseId',
        'license',
        'clientId',
        'client'
      ].includes(field.name)
    ) {
      let val = 'id-1';

      switch (field.name) {
        case 'learningPathId':
        case 'learningPath':
          val = 'learning-path-1';
          break;
        case 'courseGroup':
          val = 'courseGroup-1';
          break;
        case 'courseId':
        case 'course':
          val = 'course-1';
          break;
        case 'licenseId':
        case 'license':
          val = 'license-1';
          break;
        case 'clientId':
        case 'client':
          val = 'client-1';
          break;
      }

      return isArray ? [val] : val;
    } else if (field.name === 'contentTypes') {
      return ['courseGroups', 'learningPaths'];
    }
  }
};
