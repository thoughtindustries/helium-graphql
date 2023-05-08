const introspectionFile = require('./graphql.schema.json');
const { TYPES, ENUMS, QUERIES, MUTATIONS } = require('./definition-map');
const { writeFile } = require('fs/promises');
const { types } = introspectionFile.__schema;

const commonIdFields = ['bundle', 'course', 'learningPath', 'license', 'client'];
const recordTimestampFields = ['createdAt', 'updatedAt'];

const formatName = (name) =>
  name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase().trim();
  });
const withoutId = (name) => name.replace(/\s[Ii]d$/, '');

const handleObjects = (type) => {
  const { name, fields } = type;
  const definition = TYPES[name];
  handleTypesFields(type, fields, definition);
};

const handleInputObjects = (type) => {
  const { name, inputFields } = type;
  const definition = TYPES[name];
  handleTypesFields(type, inputFields, definition);
};

const handleTypesFields = (type, fields, definition) => {
  const { name } = type;
  const formattedName = formatName(name);

  if (definition?.metadescription) {
    type.description = definition.metadescription;
  }

  for (const field of fields) {
    const formattedFieldName = formatName(field.name);
    let { description } = field;

    if (definition?.fields[field.name]) {
      description = definition.fields[field.name];
    } else if (field?.type?.name === 'ID' || field.name.endsWith('id')) {
      if (field.name === 'id') {
        description = `The ID of the ${withoutId(formattedName)}.`;
      } else if (field.name.endsWith('id')) {
        const descSubject = field.name.slice(0, -2);
        description = `The ID of the ${descSubject}.`;
      } else {
        description = `The ID of the ${withoutId(formattedFieldName)}.`;
      }
    } else if (commonIdFields.includes(field.name)) {
      description = `The ID of the ${formattedFieldName}.`;
    } else if (recordTimestampFields.includes(field.name)) {
      const propVerb = field.name.slice(0, -2);
      description = `The time the field was ${propVerb}.`;
    } else if (field.name === 'deleted') {
      description = `Returns true when the ${formattedName} is deleted.`;
    }

    field.description = description;
  }
};

const handleEnums = (type) => {
  const { name, enumValues } = type;
  const definition = ENUMS[name];

  if (definition?.metadescription) {
    type.description = definition.metadescription;
  }

  for (const enumValue of enumValues) {
    let { name: enumName, description } = enumValue;

    if (definition?.enumValues[enumName]) {
      description = definition.enumValues[enumName];
    }

    enumValue.description = description;
  }
};

const handleQueryOrMutation = (field, isQuery) => {
  const definition = isQuery ? QUERIES[field.name] : MUTATIONS[field.name];

  if (definition?.metadescription) {
    field.description = definition.metadescription;
  }

  if (field.args.length) {
    const { args } = field;

    for (const arg of args) {
      let { description } = arg;
      if (argHasDefinition(definition, arg)) {
        description = definition.args[arg.name];
      } else if (arg?.type?.name === 'ID' || arg.name.endsWith('Id')) {
        const descSubject = arg.name.endsWith('Id') ? arg.name.slice(0, -2) : arg.name;
        description = `The ID of the ${formatName(descSubject)}.`;
      } else if (arg.name === 'page') {
        description = `The page number to return within the collection.`;
      } else if (arg.name === 'perPage') {
        description = `The amount of items to be returned on the page.`;
      }

      arg.description = description;
    }

    field.args = args;
  }
};

const argHasDefinition = (definition, arg) => {
  if (!arg.name || !definition) {
    return false;
  }

  return definition && definition.args && definition.args[arg.name];
};

(async function () {
  const hideList = ['CatalogQuery', 'HeliumDeploymentLog'];
  for (const type of types) {
    const { kind, name, fields } = type;

    if (kind === 'OBJECT') {
      if (name === 'Query' || name === 'Mutation') {
        const isQuery = name === 'Query';
        fields.forEach(function (field) {
          if (hideList.includes(field.name)) {
            fields.splice(fields.indexOf(field), 1);
          } else {
            handleQueryOrMutation(field, isQuery);
          }
        });
      } else if (name !== 'Query' && name !== 'Mutation') {
        // defined Object Types, e.g., AllocatedLearningPath, UserPurchases, etc.
        handleObjects(type);
      }
    } else if (kind === 'ENUM') {
      handleEnums(type);
    } else if (kind === 'INPUT_OBJECT') {
      handleInputObjects(type);
    }
  }

  introspectionFile.__schema.types = types;

  await writeFile('./graphql.schema.json', JSON.stringify(introspectionFile, null, 2));
})()
  .then(() => process.exit(0))
  .catch((err) => console.error('err', err));
