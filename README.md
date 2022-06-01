# Helium GraphQL Documentation

## Updating Documentation

Update the `schema` url found in `codegen.yml` to include the API key for the instance you're fetching the schema from.

Run an intospection query via `npm run generate-schema`. This will generate the `graphql.schema.json` file.

Once that's done, commit and push, and Github Actions will handle the rest!