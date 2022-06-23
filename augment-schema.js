const introspectionFile = require('./graphql.schema.json');
const DEFINITION_MAP = require('./definition-map');
const { writeFile } = require('fs/promises');
const { types } = introspectionFile.__schema;

const commonIdFields = ['bundle', 'course', 'learningPath', 'license', 'client'];
const recordTimestampFields = ['createdAt', 'updatedAt'];

const handleTypesFields = (type, fields) => {
  const { name } = type;
  const definition = DEFINITION_MAP[name];

  if (definition?.metadescription) {
    type.description = definition.metadescription;
  } 

  for (const field of fields) {
    let { description } = field;

    if (definition?.fields[field.name]) {
      description = definition.fields[field.name];
    } else if (field?.type?.name === 'ID' || field.name.endsWith('id')) {
      if (field.name === 'id') {
        description = `The ID of the ${name}`;
      } else if (field.name.endsWith('id')) {
        const descSubject = field.name.slice(0, -2);
        description = `The ID of the ${descSubject}`;
      } else {
        description = `The ID of the ${field.type.name}`;
      }
    } else if (commonIdFields.includes(field.name)) {
      description = `The ID of the ${field.name}`;
    } else if (recordTimestampFields.includes(field.name)) {
      const propVerb = field.name.slice(0, -2);
      description = `The time the field was ${propVerb}`;
    } else if (field.name === 'deleted') {
      description = `Returns true when the ${name} is deleted.`;
    }

    field.description = description;
  }
};

const handleQueryOrMutation = field => {
  const definition = DEFINITION_MAP[field.name];

  if (definition?.metadescription) {
    field.description = definition.metadescription;
  }

  if (field.args.length) {
    const { args } = field;

    for (const arg of args) {
      let { description } = arg;

      if (definition?.args[arg.name]) {
        description = definition.args[arg.name];
      } else if (arg?.type?.name === 'ID' || arg.name.endsWith('Id')) {
        const descSubject = arg.name.endsWith('Id') ? arg.name.slice(0, -2) : arg.name;
        description = `The ID of the ${descSubject}`;
      } else if (arg.name === 'page') {
        description = `The page number to return within the collection.`;
      }

      arg.description = description;
    }

    field.args = args;
  }
};

(async function() {
  for (const type of types) {
    const { kind, name, fields } = type;

    if (kind === 'OBJECT') {
      if (name === 'Query' || name === 'Mutation') {
        fields.forEach(field => handleQueryOrMutation(field));
      } else if (name !== 'Query' && name !== 'Mutation') {
        // defined Object Types, e.g., AllocatedLearningPath, UserPurchases, etc.
        handleTypesFields(type, fields);
      }
    }

    type.fields = fields;
  }

  introspectionFile.__schema.types = types;

  await writeFile('./graphql.schema.json', JSON.stringify(introspectionFile, null, 2));
})()
  .then(() => process.exit(0))
  .catch(err => console.error('err', err));
