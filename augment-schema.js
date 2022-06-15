const introspectionFile = require('./graphql.schema.json');
const { writeFile } = require('fs/promises');
const { types } = introspectionFile.__schema;

const commonIdFields = ['bundle', 'course', 'learningPath', 'license', 'client'];
const recordTimestampFields = ['createdAt', 'updatedAt'];

const handleTypesFields = (typeName, fields) => {
  for (const field of fields) {
    let { description } = field;

    if (field?.type?.name === 'ID' || field.name.endsWith('id')) {
      if (field.name === 'id') {
        description = `The ID of the ${typeName}`;
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
      description = `Returns true when the ${typeName} is deleted.`;
    }

    field.description = description;
  }
};

const handleQueries = query => {
  if (query.args.length) {
    const { args } = query;

    for (const arg of args) {
      let { description } = arg;

      if (arg?.type?.name === 'ID' || arg.name.endsWith('Id')) {
        const descSubject = arg.name.endsWith('Id') ? arg.name.slice(0, -2) : arg.name;
        description = `The ID of the ${descSubject}`;
      } else if (arg.name === 'page') {
        description = `The page number to return within the collection.`;
      }

      arg.description = description;
    }

    query.args = args;
  }
};

(async function() {
  for (const type of types) {
    const { kind, name, fields } = type;

    if (kind === 'OBJECT') {
      if (name === 'Query') {
        for (const query of fields) {
          handleQueries(query);
        }
      } else if (name !== 'Query' && name !== 'Mutation') {
        // defined Object Types, e.g., AllocatedLearningPath, UserPurchases, etc.
        handleTypesFields(name, fields);
      }
    }

    type.fields = fields;
  }

  introspectionFile.__schema.types = types;

  await writeFile('./augmented-schema.json', JSON.stringify(introspectionFile, null, 2));
})()
  .then(() => process.exit(0))
  .catch(err => console.error('err', err));
