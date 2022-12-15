# Helium GraphQL Documentation

## Documentation Standards
- For queries and mutations
    - For every query and mutation, there needs to be a clear, easy to understand explanation of what the query or mutation does
    - For each argument of each query and mutations there needs to be a description of what the argument represents

- In general...
    - The developers reading this documentation are likely unfamiliar with our platform so it is best to over document


## Updating Documentation

Update the `schema` url found in `codegen.yml` to include the API key for the instance you're fetching the schema from.

Run an intospection query via `npm run generate-schema`. This will generate the `graphql.schema.json` file.

## Writing Custom Descriptions

The `definition_map.js` file is used to add custom description to queries, mutations, arguments, and types. 

To add descriptions to types, queries, or mutations, simply add a new property to the corresponding object in `definition_map` where the key is the type, query, or mutation name. To add the description, simply add a `metadescription` property to the object e.g.,

```javascript
const MUTATIONS = {
    ArchiveUserCourse: {
        metadescription: "Archives a user's access to a course."
   }
}
```

To add descriptions to the arguments of that query or mutation, add an `args` object whose value is an `object`, wherein each property of that object corresponds to the argument you'd like to update, e.g.,

```javascript
const MUTATIONS = {
    ArchiveUserCourse: {
        args: {
            id: "The ID of the course to be archived."
        }
   }
}
```

For types and enums, the process is similar, only passing a `fields` property instead of `args`, e.g., 

```javascript
CatalogMeta: {
    metadescription: "Contains metadata about a requested Catalog.",
    fields: {
        contentTypes: "Content Types requested in the Catalog."
    }
}
```

## Custom Values for Example Responses

Spectaql will generate sample values based on the returned properties `type`, using a few characters, for strings, etc. In instances where we want to provide more accurate examples, we can utilize `example-processor.js`. You'll need to check the `field.name`, whether `isArray`, and provide the example string/int/date you would like returned, e.g.,

```javascript
if (field.name === 'contentTypes') {
  return ['courseGroups', 'learningPaths'];
}
```

Once that's done, commit and push, and Github Actions will handle the rest!
